var g_show_categories = true;
var g_show_subcategories = true;
var g_show_inactive = true;

var g_num_days = 5;

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
    g_num_days = parseInt($("#dashboard-table").data("num-days"));

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
        var table_row = $(this).closest('tr')
        var test_id = table_row.data('test-id');
        var num_days = g_num_days;
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
            })
            g_show_categories ? table_row.find('.category-column').show() : table_row.find('.category-column').hide()
            g_show_subcategories ? table_row.find('.subcategory-column').show() : table_row.find('.subcategory-column').hide()
        }
        updateResultModalFormLink();
    });

});


$(function() {

    var contextMenu = $("#test-result-context-menu");
    var selected_test_id = null;
    var selected_result_id = null;

    $("body").on("contextmenu", "table tr .result-status-cell", function(e) {
         contextMenu.css({
              display: "block",
              left: e.pageX,
              top: e.pageY
         });

         selected_test_id = $(this).data('test-id');
         selected_result_id = $(this).data('result-id');

         return false;
    });

    $('html').click(function() {
         contextMenu.hide();
    });

  $("#test-result-context-menu li a").click(function(e){
    var  f = $(this);
    var action_id = f.attr('id')
    debugger;
    switch (action_id) {
        case 'test-result-context-menu-edit-result':
            alert('Edit Result option not implemented...')
            break;
        case 'test-result-context-menu-delete-result':
            alert('Delete Result option not implemented...')
            break;
        case 'test-result-context-menu-copy-result-to-current':
            alert('Copy Result To Current option not implemented...')
            break;
        case 'test-result-context-menu-edit-test':
            alert('Edit Test option not implemented...')
            break;
        case 'test-result-context-menu-delete-test':
            alert('Delete Test option not implemented...')
            break;
    }
    selected_result_id = null;
    selected_test_id = null;
  });

});