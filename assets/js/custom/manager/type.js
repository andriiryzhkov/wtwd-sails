$(document).ready(function() {
  getTypes();

  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('item');
    var modal = $(this);
    if (recipient == -1) {
      modal.find('.modal-title').text('Додати тип послуги');
      modal.data('id', -1);
      $("#dataForm").trigger("reset");
    } else {
      modal.find('.modal-title').text('Редагувати тип послуги ' + recipient)
      modal.data('id', recipient);
      $.ajax({
          method: 'GET',
          url: "/api/type/" + recipient,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        })
        .done(function(response) {
          modal.find('#inputTitle').val(response.title);
        })
    }
  })
});

function saveType() {
  id = $('#myModal').data('id');
  if (id == -1) {
    createType();
  } else {
    updateType(id);
  }
}

function getTypes() {
  $.ajax({
      method: 'GET',
      url: "/api/type",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      var tableBody = $("#dataTable").empty();
      var html = '';
      response.forEach(function(item, i, arr) {
        html = '<tr><td>';
        html += item.title || '';
        html += '</td><td>';
        html += '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" data-item="' + item.id_type + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> ';
        html += '<button type="button" class="btn btn-danger btn-sm" onclick="deleteType(' + item.id_type + ')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
        html += '</td>';
        html += '</tr>';
        tableBody.append(html);
      });
    });
}

function createType() {
  data = {
    title: $('#inputTitle').val()
  }
  $.ajax({
      method: 'POST',
      url: "/api/type",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getTypes();
    });
}

function updateType(id) {
  data = {
    title: $('#inputTitle').val()
  }
  $.ajax({
      method: 'PUT',
      url: "/api/type/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getTypes();
    });
}

function deleteType(id) {
  $.ajax({
      method: 'DELETE',
      url: "/api/type/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      getTypes();
    });
}
