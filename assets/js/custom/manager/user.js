$(document).ready(function() {
  getUsers();

  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var recipient = button.data('item');
    var modal = $(this);
    if (recipient == -1) {
      modal.find('.modal-title').text('Додати користувача');
      modal.data('id', -1);
      $("#dataForm").trigger("reset");
    } else {
      modal.find('.modal-title').text('Редагувати користувача ' + recipient)
      modal.data('id', recipient);
      $.ajax({
          method: 'GET',
          url: "/api/user/" + recipient,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        })
        .done(function(response) {
          modal.find('#inputLastName').val(response.last_name);
          modal.find('#inputFirstName').val(response.first_name);
          modal.find('#inputMiddleName').val(response.middle_name);
          modal.find('#inputEmail').val(response.email);
          modal.find('#inputPassword').val(null);
          modal.find('#inputManager').prop('checked', response.manager);
          modal.find('#inputAddress').val(response.address);
          modal.find('#inputCity').val(response.city);
          modal.find('#inputPostcode').val(response.postcode);
          modal.find('#inputPhone').val(response.phone);
          modal.find('#inputContract').val(response.contract);
        })
    }
  })
});

function saveUser() {
  id = $('#myModal').data('id');
  if (id == -1) {
    createUser();
  } else {
    updateUser(id);
  }
}

function getUsers() {
  $.ajax({
      method: 'GET',
      url: "/api/user",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      var tableBody = $("#dataTable").empty();
      var html = '';
      response.forEach(function(item, i, arr) {
        html = '<tr><td>';
        html += item.last_name || '';
        html += '<br />';
        html += item.first_name || '';
        html += ' ';
        html += item.middle_name || '';
        html += '</td><td>';
        html += item.email;
        html += '</td><td>';
        html += item.address || '';
        html += '<br />';
        html += item.city || '';
        html += ' ';
        html += item.postcode || '';
        html += '</td><td>';
        html += item.phone || '';
        html += '</td><td>';
        html += item.contract || '';
        html += '</td><td>';
        html += '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" data-item="' + item.id_user + '"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> ';
        html += '<button type="button" class="btn btn-danger btn-sm" onclick="deleteUser(' + item.id_user + ')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
        html += '</td>';
        html += '</tr>';
        tableBody.append(html);
      });
    });
}

function createUser() {
  data = {
    email: $('#inputEmail').val(),
    password: $('#inputPassword').val(),
    last_name: $('#inputLastName').val(),
    first_name: $('#inputFirstName').val(),
    middle_name: $('#inputMiddleName').val(),
    address: $('#inputAddress').val(),
    city: $('#inputCity').val(),
    postcode: $('#inputPostcode').val(),
    phone: $('#inputPhone').val(),
    contract: $('#inputContract').val(),
    manager: $('#inputManager').is(":checked")
  }
  $.ajax({
      method: 'POST',
      url: "/api/user",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getUsers();
    });
}

function updateUser(id) {
  data = {
    email: $('#inputEmail').val(),
    last_name: $('#inputLastName').val(),
    first_name: $('#inputFirstName').val(),
    middle_name: $('#inputMiddleName').val(),
    address: $('#inputAddress').val(),
    city: $('#inputCity').val(),
    postcode: $('#inputPostcode').val(),
    phone: $('#inputPhone').val(),
    contract: $('#inputContract').val(),
    manager: $('#inputManager').is(":checked")
  }
  if ($('#inputPassword').val() != '') {
    data.password = $('#inputPassword').val();
  }
  $.ajax({
      method: 'PUT',
      url: "/api/user/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data)
    })
    .done(function(response) {
      getUsers();
    });
}

function deleteUser(id) {
  $.ajax({
      method: 'DELETE',
      url: "/api/user/" + id,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    .done(function(response) {
      getUsers();
    });
}
