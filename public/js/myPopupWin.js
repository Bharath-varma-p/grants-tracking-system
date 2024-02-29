var popupIsOpen = false;

function myPopupWin(windowLocation, cb = () => {}) {
  if (!popupIsOpen) {
    popupIsOpen = true;

    let width = 0.95,
      height = 0.97;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      width = 1;
      height = 0.97;
    }

    windowLocation = insertSourcePage(windowLocation);

    $("html, body").addClass("no_scroll");

    $.colorbox({
      iframe: true,
      speed: 200,
      title: false,
      width: $(window).width() * width,
      height: $(window).height() * height,
      href: windowLocation,
      onClosed: function () {        
        $("html, body").removeClass("no_scroll");
        popupIsOpen = false;
        cb();
        $(".modal-backdrop.in").remove();
        $("html, body").removeClass("no_scroll");
        table.ajax.reload(null, false);
      //  $('html, body').css('overflow', 'auto');
        $(".cboxElement").removeClass("cboxElement");
        if (
          windowLocation.includes("edit") ||
          windowLocation.includes("Edit") ||
          windowLocation.includes("view") ||
          windowLocation.includes("View")
        ) {
        }
      },
    });
  }
}
