const focusedEditors = [];
let narrativeChangeTimeout;
$(function () {
  $(".use-editor")
    .each(function (i, editor) {
      const incompleteNarrative = localStorage.getItem(
        location.href + "_narrative"
      );

      if (incompleteNarrative) {
        Swal.fire({
          title: "Incomplete narrative",
          html: `
        <p style="color:#75b5eb">There is an incomplete narrative. Would you like to continue with that?</p>
        <hr/>
        <p style="text-align:left">${htmlToText(incompleteNarrative).substring(
          0,
          100
        )}...</p>
        `,
          icon: "question",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            $(editor).summernote("code", incompleteNarrative);
          } else {
            localStorage.removeItem(location.href + "_narrative");
          }
        });
      }
    })
    .summernote({
      height: 300,
      tabsize: 2,
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "clear"]],
        ["fontname", ["fontname"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]],
        ["misc", ["undo", "redo"]],
      ],
      callbacks: {
        onChange: function (contents) {
          if (focusedEditors.includes(this)) {
            if (narrativeChangeTimeout) {
              clearTimeout(narrativeChangeTimeout);
              narrativeChangeTimeout = null;
            }

            const isEmpty = $(this).summernote("isEmpty");

            if (isEmpty) {
              localStorage.removeItem(location.href + "_narrative");
            } else {
              narrativeChangeTimeout = setTimeout(() => {
                  localStorage.setItem(location.href + "_narrative", contents);
              }, 5 * 1000);
            }

            if (typeof formDirtyInput === "undefined") {
              setFormDirty();
            }
          }
        },
        onFocus: function () {
          focusedEditors.push(this);
        },
        onInit: function () {
          $(this).summernote(globalVariables.isViewMode ? "disable" : "enable");
        },
      },
    });
});
