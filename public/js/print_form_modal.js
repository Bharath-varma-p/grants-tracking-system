function printButtonClick() {
  const print_url = $(this).attr("data-url");
  myPopupWin(print_url);

  $("#printModal").modal("hide");
}

let printButtonsDivAdded = false;

$(document).ready(function () {
  $(document).on("click", "[data-slug]", async function () {
    const data_slug = $(this).attr("data-slug");
    const data_print_url = $(this).attr("data-url");

    if (data_slug) {
      const slugs = data_slug.split(",");

      const print_urls = data_print_url.split("|");

      $("#printModal .print-buttons-header").remove();

      printButtonsDivAdded = false;

      let slugIndex = 0;
      for (let slug of slugs) {
        const print_url = print_urls[slugIndex];

        await createPrintButtons(slug, print_url);

        slugIndex++;
      }

      showPrintModal(data_slug);
    }
  });

  $(document).on("click", ".summary-print-btn", async function () {
    const table = $(this).parents("table[data-source]").eq(0);
    const source = table.attr("data-source");
    const page = table.attr("data-page");
    const data = table.DataTable().row($(this).parents("tr")).data();

    $("#printModal .print-buttons-header").remove();

    let slug;
    let print_url;
    printButtonsDivAdded = false;

    $("#printModal .print-buttons-header").remove();
    if (source == "arrest") {
      print_url = generateLink("arrest", "print", data);
      slug = "arrest";
    } else if (source == "suspect") {
      print_url = generateLink("suspect", "print", data);
      slug = "arrest";
    } else if (source == "evidence") {
      print_url = generateLink("evidence", "print", data);
      slug = "evidence_property";
    } else if (source == "narrative") {
      if (page === "incident") {
        print_url = generateLink("narrative", "print", data);
      }

      if (page === "daily_log") {
        print_url = generateLink("daily_log", "print_narrative", data);
      }

      if (page === "traffic_crash") {
        print_url = generateLink("traffic_crash", "print_narrative", data);
      }

      if (page === "traffic_citation") {
        print_url = generateLink("traffic_citation", "print_narrative", data);
      }

      if (page === "warrant_citation_arrest") {
        print_url = generateLink("warrant_citation_arrest", "print_narrative", data);
      }

      if (page === "fir") {
        print_url = generateLink("fir", "print_narrative", data);
      }

      slug = "narrative";
    } else if (source == "traffic_citation") {
      print_url = generateLink("traffic_citation", "print", data);
      slug = "citation";
    } else if (source == "traffic_citation_witness") {
      print_url = generateLink("traffic_citation", "print", data);
      slug = "citation";
    } else if (source == "warrant_citation_arrest" || source == "arrest_non") {
      print_url = generateLink("warrant_citation_arrest", "print", data);
      slug = "arrest";
    } else if (source == "fir") {
      print_url = generateLink("fir", "print", data);
      slug = "fir";
    } else if (source == "linked_incident") {
      print_url = generateLink("incident", "print", data);
      slug = "incident";
    } else if (source == "daily_log") {
      print_url = generateLink("daily_log", "print", data);
      slug = "daily_log";
    } else if (source == "court_management") {
      const slugs = ["court_bench_print", "court_docket_printInd"];

      for (let slug of slugs) {
        const print_url = `/${globalVariables.routLink}${slug}/${data.id}?master_name_id=${data.master_name_id}`;
        await createPrintButtons(slug, print_url);
      }

      showPrintModal(slugs.join(","));
      return;
    } else if (source == "vacation_watch_check_logs") {
      const slugs = ["vacation_watch_print_check_log"];
      for (let slug of slugs) {
        const print_url = generateLink("vacation_watch_check_logs", "print", { id: data.id, watch_no: data.watch_no });
        await createPrintButtons(slug, print_url);
      }

      showPrintModal(slugs.join(","));
      return;
    }

    if (print_url) {
      await createPrintButtons(slug, print_url);
      showPrintModal(slug);
    }
  });
});

async function createPrintButtons(slug, print_url) {
  const [urlWithoutQuery, queryString] = print_url.split("?");

  const printForms = await $.post("/" + globalVariables.routLink + "getPrintForms", { slug });

  if (slug == "arrest") {
    $("#printModal .modal-header:last").after(`
    <div class="modal-header print-buttons-header">
        <h4 class="modal-title">Printing Forms</h4>
        <div class="print-buttons"></div>
    </div>
  `);

    const mayor_court_print_buttons_header = $("#printModal .print-buttons-header").eq(0);

    const city_court_print_buttons_header = mayor_court_print_buttons_header.clone();
    city_court_print_buttons_header.insertAfter(mayor_court_print_buttons_header);

    mayor_court_print_buttons_header.find(".modal-title").text("Mayor's Court");
    city_court_print_buttons_header.find(".modal-title").text("City/State Court");

    const mayor_court_print_buttons_div = mayor_court_print_buttons_header.find(".print-buttons").eq(0);
    const city_court_print_buttons_div = city_court_print_buttons_header.find(".print-buttons").eq(0);

    const slugPrintForms = printForms.filter((p) => p.slug == slug);

    slugPrintForms.forEach((printForm) => {
      mayor_court_print_buttons_div.append(`
       <button type="button" postid="${printForm.postid}" id="${
        printForm.slug + printForm.postid
      }" data-url="${urlWithoutQuery}?court_type=0&templateId=${printForm.postid}&form_name=${printForm.title}${
        queryString.length > 0 ? "&" + queryString : ""
      }" class="btn btn-primary iframe">
            ${printForm.title}
       </button>
    `);

      city_court_print_buttons_div.append(`
        <button type="button" postid="${printForm.postid}" id="${
        printForm.slug + printForm.postid
      }" data-url="${urlWithoutQuery}?court_type=1&templateId=${printForm.postid}&form_name=${printForm.title}${
        queryString.length > 0 ? "&" + queryString : ""
      }" class="btn btn-primary iframe">
            ${printForm.title}
        </button>
    `);
    });
  } else {
    if (!printButtonsDivAdded) {
      $("#printModal .modal-header:last").after(`
            <div class="modal-header print-buttons-header">
                <h4 class="modal-title">Printing Forms</h4>
                <div class="print-buttons"></div>
            </div>
        `);

      printButtonsDivAdded = true;
    }

    const slugPrintForms = printForms.filter((p) => p.slug == slug);
    slugPrintForms.forEach((printForm) => {
      $(".print-buttons").append(`
            <button type="button" postid="${printForm.postid}" id="${
        printForm.slug + printForm.postid
      }" data-url="${urlWithoutQuery}?templateId=${printForm.postid}&formName=${printForm.title}${
        queryString && queryString.length > 0 ? "&" + queryString : ""
      }" 
                class="btn btn-primary iframe">${printForm.title}</button>
        `);
    });
  }
}

function showPrintModal(slugsWithCommas) {
  $("#printFormsEditLink").prop("href", "/" + globalVariables.routLink + "form_edit/" + slugsWithCommas);

  $("#printModal").modal("show");

  $("button[postid]", "#printModal").off("click", printButtonClick).on("click", printButtonClick);
}
