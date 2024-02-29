/*
EXAMPLE DATA

  [
    {
      id:"6",
      pageName: 'RMS',
      list_id: 'RMS',
      a_href: null,
      icon_class: 'fa fa-database',
      notificationCount: 0,
      childMenuId: 'rms2',
      defaultDisplay:true,
      subMenus: [
        {
          id:"6.1",
          pageName: 'Offense/Non Criminal',
          list_id: 'view',
          a_href: 'view',
          defaultDisplay:true
        }
      ],
      dontShowAtEmployeesPage: false
    }
  ]


  pageName : display name of the menu element
  list_id : the id attribute of the menu element
  a_href : anchor tag of the menu element
  icon-class : font awesome class for the main menu element.
  notificationCount : user's notification count data from database
  childMenuId: the id of the container ul element of the submenus
  subMenus: the array of the sub menus under the current main menu element
  defaultDisplay : to show/hide the menu on the left side bar as default.
  dontShowAtEmployeesPage : If true the menu will be invisible at employees page select options. If true defaultDisplay value will be overwritten. The menu will always be invisible in left side menu. 
*/

/**
 * Get left side menu array. All main menus and sub menus are fetched from menus.json
 */
function getMenus()
{
    return $.getJSON("../js/menus.json");
}






