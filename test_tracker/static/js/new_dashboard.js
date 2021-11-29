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
                    addModalFormFunction: updateResultModalFormLink,
                }
            })
            g_show_categories ? table_row.find('.category-column').show() : table_row.find('.category-column').hide()
            g_show_subcategories ? table_row.find('.subcategory-column').show() : table_row.find('.subcategory-column').hide()
        }
        updateResultModalFormLink();
    });

});


$(function() {

    var result_context_menu = $("#test-result-context-menu");
    var testcase_context_menu = $("#test-case-context-menu");
    var selected_test_id = null;
    var selected_result_id = null;
    var xms_name = $("#dashboard-table").data('xms-name');
    var xms_version = $("#dashboard-table").data('xms-version');

    $("body").on("contextmenu", "table tr .result-status-cell", function(e) {
         result_context_menu.css({
              display: "block",
              left: e.pageX,
              top: e.pageY
         });

        var selected_test_id = $(this).data('test-id');
        var selected_result_id = $(this).data('result-id');
        var table_row = $(this).closest('tr');

        function place_holder() {
            g_show_categories ? table_row.find('.category-column').show() : table_row.find('.category-column').hide()
            g_show_subcategories ? table_row.find('.subcategory-column').show() : table_row.find('.subcategory-column').hide()
        }

        let update_result_modal_url = '/TestTracker/update/result/' + selected_result_id;
         $('#test-result-context-menu-edit-result').modalForm({
            formURL: update_result_modal_url,
            asyncUpdate: true,
            asyncSettings: {
                closeOnSubmit: true,
                successMessage: ' ',
                dataUrl: "/TestTracker/async/new/update/testcase-in-table/" + selected_test_id + "-" + g_num_days,
                dataElementId: "#test-id-" + selected_test_id,
                dataKey: "result",
                addModalFormFunction: place_holder,
            }
         });

        let copy_date = $(this).data('copy-date');
        let copy_result_modal_url = '/TestTracker/update/copy/' + xms_name + '/' + xms_version + '/' + copy_date + '/' + selected_result_id;
         $('#test-result-context-menu-copy-result-to-current').modalForm({
            formURL: copy_result_modal_url,
            asyncUpdate: true,
            asyncSettings: {
                closeOnSubmit: true,
                successMessage: ' ',
                dataUrl: "/TestTracker/async/new/update/testcase-in-table/" + selected_test_id + "-" + g_num_days,
                dataElementId: "#test-id-" + selected_test_id,
                dataKey: "result",
                addModalFormFunction: place_holder,
            }
         });


        let delete_result_modal_url = '/TestTracker/delete/result/' + selected_result_id;
         $('#test-result-context-menu-delete-result').modalForm({formURL: delete_result_modal_url});

        let update_test_modal_url = '/TestTracker/update/testcase/' + selected_result_id;
         $('#test-result-context-menu-update-test').modalForm({
            formURL: update_test_modal_url,
            asyncUpdate: true,
            asyncSettings: {
                closeOnSubmit: true,
                successMessage: ' ',
                dataUrl: "/TestTracker/async/new/update/testcase-in-table/" + selected_test_id + "-" + g_num_days,
                dataElementId: "#test-id-" + selected_test_id,
                dataKey: "result",
                addModalFormFunction: place_holder,
            }
         });

        let delete_test_modal_url = '/TestTracker/delete/testcase/' + selected_test_id;
         $('#test-result-context-menu-delete-test').modalForm({formURL: delete_test_modal_url});

        var selected_test_id = null;
        var selected_result_id = null;

         return false;
    });

    $("body").on("contextmenu", "table tr .test-row-header", function(e) {
         testcase_context_menu.css({
              display: "block",
              left: e.pageX,
              top: e.pageY
         });

         selected_test_id = $(this).closest('tr').data('test-id');
        var table_row = $(this).closest('tr');

        function place_holder() {
            g_show_categories ? table_row.find('.category-column').show() : table_row.find('.category-column').hide()
            g_show_subcategories ? table_row.find('.subcategory-column').show() : table_row.find('.subcategory-column').hide()
        }

        let update_test_case_modal_url = '/TestTracker/update/testcase/' + selected_test_id;
         $('#test-case-context-menu-edit-test').modalForm({
            formURL: update_test_case_modal_url,
            asyncUpdate: true,
            asyncSettings: {
                closeOnSubmit: true,
                successMessage: ' ',
                dataUrl: "/TestTracker/async/new/update/testcase-in-table/" + selected_test_id + "-" + g_num_days,
                dataElementId: "#test-id-" + selected_test_id,
                dataKey: "result",
                addModalFormFunction: place_holder,
            }
         });

        let delete_test_modal_url = '/TestTracker/delete/testcase/' + selected_test_id;
         $('#test-case-context-menu-delete-test').modalForm({formURL: delete_test_modal_url});

        var selected_test_id = null;

         return false;
    });

    $('html').click(function() {
         result_context_menu.hide();
         testcase_context_menu.hide();
    });


});