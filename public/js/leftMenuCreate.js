/**
 * This JS file creates menu elemets of left side bar including responsive options.
 * To create a new menu, you need to add an object to the menus array
 * @param {*} notificationCount User's total notification count
 * @param {*} pagePrefers User's page preferences according to database
 * @param {*} privileges User's privileges
 * @param {*} CURRENT_URL User's active page
 */
const createLeftMenu = function (notificationCount, pagePrefers , privileges , CURRENT_URL, callback) {

  //getting predefined menu list from menus.json file
  getMenus().done(function(menus){

    menus[0].notificationCount = notificationCount;

    //This for loop is written to assign order number to every main menu element according to user's prefer.
    for (let i = 0; i < menus.length; i++) {
  
      //the menu's index according to user preferences
      //If user has not permission to see the menu, we discard the index of that menu. Because it wont be displayed.
      var pagePreferIndex = pagePrefers
        .findIndex(item => menus[i].list_id == item.page_name);
  
      //if pagePreferIndex == -1, the menu is not in user preferences. We assume the index of the menu in array as order number. 
      //If pagepreferIndex > -1 then menu is in user preferences. We assume page preferences index in page_prefer table as order number
      menus[i].orderNumber = pagePreferIndex == -1 ? i : pagePreferIndex;
  
      //if menu is not in user preferences then we add secondOrderNumber. If we have two menu with same order number, the menu placed at higher level at menus.json  will be showed above.
      menus[i].secondOrderNumber = i;
    }
    //This for loop is written for ordering main menus according to user's prefer.
    menus.sort((a, b) => {
      return a.orderNumber < b.orderNumber
        ? -1
        : a.orderNumber > b.orderNumber
        ?
        1
        :
          ////If we have two menu with same order number, the menu placed at higher level at menus.json  will be showed above   
           a.secondOrderNumber < b.secondOrderNumber
           ?
           -1
           :
           1;
    });
  
    //To get userdashboard from https://localhost/.../userdashboard
    const currentPageUrl = CURRENT_URL.split('/')[
      CURRENT_URL.split('/').length - 1
    ];
  
    //level is the indicator of menu's hierarchy. If level = 1 then menu is a main menu element. If level is greater than 1 then menu is a sub menu.
    let level = 1;
  
    //Latest html output of the left side menu which will be put under ul element of which id is #sortable5
    let sideMenuHtml = '';
  
    //The function that returns menu html and adds to sideMenuHtml variable.
    function createSideMenu(menus, level) {
      //To determine whether main menu has active class or not.
      let isActiveMainMenu = false;
  
      for (let i = 0; i < menus.length; i++) {
        //isCurrentPage : to add current-page class to current menu if the menu is the active page.
        let isCurrentPage = menus[i].list_id == currentPageUrl;
        if (isCurrentPage) isActiveMainMenu = true;
  
        var hasPermission = privileges.some(p => 
          (
            p.menu_id == menus[i].list_id
            || 
            (
              menus[i].subMenus 
              && 
              menus[i].subMenus.findIndex( subMenu => subMenu.list_id == p.menu_id ) > -1
            )
          )
          && 
          p.has_permission == 1);
  
        //if menu's defaultDisplay propery is true, it will be showed as default.
        //var shouldDisplayed=  menus[i].defaultDisplay;
        var shouldDisplayed = hasPermission || menus[i].requirePrivilege === false;
  
        /*
        if (privilege)
        {
            //if user has privilege related to the menu, we must check user has permission to see the menu 
            //if has_permission == 0 , we wont display the menu otherwise we display thr menu  
            shouldDisplayed = privilege.has_permission == 1;
        }
        
        if (menus[i].dontShowAtEmployeesPage)
        {
            
          //If the dontShowAtEmployeesPage property of menu exists and its value is true then we must not show the menu.
          //Because we must not show the menu that isn't listed at employees page. We can consider that the menu is disabled. So we wont show.  
          shouldDisplayed=false;
        }

        */
        //Checks the user is authorized to see the menu or not
        if (shouldDisplayed) {
          // Create <li> element for menu element
          sideMenuHtml += `<li id="${menus[i].list_id}" class=${
            level == 1 ? '"className"' : isCurrentPage ? '"current-page"' : '""'
          }>`;
          // Create <a> element for menu element
          sideMenuHtml += `<a ${
            menus[i].a_href ? 'href="' + menus[i].a_href + '"' : ''
          }>`;
          //Check menu is a main menu element and add <i> element with icons
          if (menus[i].icon_class) {
            sideMenuHtml += `<i class="${menus[i].icon_class}"></i>`;
          }
  
          //Write menu display name inside anchor tag
          sideMenuHtml += menus[i].pageName;
  
          if (menus[i].subMenus && menus[i].subMenus.length > 0) {
            sideMenuHtml += '<span class="fa fa-chevron-down"></span>';
          }
  
          //if a notification count is added to the any main menu element from the database, this code automatically renders span element inside main menu
          //after notificationCount property is added to the menus object.
          if (menus[i].notificationCount != null && i == 0) {
            sideMenuHtml += `<span class="badge badge-danger pull-right hidden-small" id="badge_sayi" style="background:red">${menus[i].notificationCount}</span>`;
          }
  
          sideMenuHtml += '</a>';
  
          //if current menu has sub menus, sub menus html will be created calling createSideMenu function recursively
          if (menus[i].subMenus && menus[i].subMenus.length > 0) {
            //creating container ul element of sub menus
            sideMenuHtml += `<ul id=${menus[i].childMenuId} class="nav child_menu" style="childMenuStyle">`;
  
            //calling createSideMenu function to get sub menus html. This one is a recursive function.
            //We automatically increase the level parameter to seperate sub menus from main menu elements.
            let subMenuResult = createSideMenu(menus[i].subMenus, level + 1);
  
            if (subMenuResult.isActiveMainMenu) {
              //If any sub menu is the current page then we must add active class to the main menu of this sub menu and current-page class to the sub menu.
              //If main menu is the current page and has no sub menus then we must add current-page class to main menu element.
              sideMenuHtml = sideMenuHtml.replace('className', 'active');
  
              //To display sub menus automatically without the need of clicking the arrow button, when the current page is sub menu
              sideMenuHtml = sideMenuHtml.replace(
                'childMenuStyle',
                'display:block',
              );
            } else {
              sideMenuHtml = sideMenuHtml.replace('childMenuStyle', '');
              sideMenuHtml = sideMenuHtml.replace(
                'className',
                isCurrentPage ? 'current-page' : '',
              );
            }
  
            sideMenuHtml += '</ul>';
  
            sideMenuHtml += '</li>';
          } else {
            if (level == 1) {
              sideMenuHtml = sideMenuHtml.replace(
                'className',
                isCurrentPage ? 'current-page' : '',
              );
            }
          }
        }
      }
      return {
        isActiveMainMenu: isActiveMainMenu,
      };
    }
  
    createSideMenu(menus, level);
  
    $('#sortable5').append(sideMenuHtml);

    callback();
  });
};
