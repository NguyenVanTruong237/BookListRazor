
var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            {"data": "name" },
            {"data": "author"},
            { "data": "isbn" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/booklist/upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            edit
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                           onclick=Delete('/api/book?id='+${data})>
                            Delete
                        </a>
                        </div>`;
                } 
            }
        ],
        "language": {
            "emptyTable": "no data found"
        }
        
    });
}
function Delete(url) {
    swal({
        title: "Bạn có muốn xóa không?",
        text: "Xóa sẽ không khôi phục lại dữ liệu, bạn có chắc chắn?",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
                $.ajax({
                    url: url,
                    type: "DELETE",
                    success: function (data) {
                        if (data.success) {         //data trong success gồm true và false, nếu true trả về message, fales tương tư.
                            toastr.success(data.message);   
                            dataTable.ajax.reload();
                        }
                        else {
                            toastr.error(data.message);
                        }
                    }
                });

            }
        });
}
