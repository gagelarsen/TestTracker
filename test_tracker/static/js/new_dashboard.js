var g_show_categories = true;
var g_show_subcategories = true;
var g_show_inactive = true;


function toggle_hide_categories() {
    if (!g_show_categories) {
        g_show_categories = true;
        $(".category-column").show();
    }
    else {
        g_show_categories = false;
        $(".category-column").hide();
    }

}

function toggle_hide_subcategories() {
    if (!g_show_inactive) {
        g_show_inactive = true;
        $(".subcategory-column").show();
    } else {
        g_show_inactive = false;
        $(".subcategory-column").hide();
    }

}

function toggle_hide_inactive() {
    if (!g_show_subcategories) {
        g_show_subcategories = true;
        $("[data-test-active='False']").show();
    }
    else {
        g_show_subcategories = false;
        $("[data-test-active='False']").hide();
    }
}


$(document).ready( function () {
     // Setup Category Javascript
    toggle_hide_categories();
    toggle_hide_subcategories();
    document.getElementById("hide-show-categories-button").addEventListener("click", function() {
        toggle_hide_categories();
        toggle_hide_subcategories();
    });

    // Setup Active/Inactive Javascript
    toggle_hide_inactive();
    document.getElementById("hide-show-inactive-button").addEventListener("click", function() {
        toggle_hide_inactive();
    });


    $(".result-status-cell").each(function () {
        var result_id = $(this).data('result-id');
        var update_result_link_url = $(this).data('update-url');
       var test_id = $(this).closest('tr').data('test-id');
       var num_days = $('#dashboard-table').data('num-days');
        function updateResultModalFormLink() {
            $("#result-status-" + result_id).modalForm({
                formURL: update_result_link_url,
                asyncUpdate: true,
                asyncSettings: {
                    closeOnSubmit: true,
                    successMessage: ' ',
                    dataUrl: "/TestTracker/async/new/update/testcase-in-table/" + test_id + "-" + num_days,
                    dataElementId: "#test-id-" + test_id,
                    dataKey: "result",
                    addModalFormFunction: updateResultModalFormLink
                }
            });
        }
        updateResultModalFormLink();
    });

});