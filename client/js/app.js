function getAccountList(success, error) {
  var soql = "SELECT Id, Name FROM Account";
  force.query(soql, success, error);
}

function getAccountDetails(accountId, success, error) {
  var soql = "SELECT FirstName, " +
  "LastName, " +
  "Account.Name, " +
  "Email " +
  "FROM Contact " +
  "WHERE Account.Id = '" + accountId + "'";
  force.query(soql, success, error);
}

function showAccountList() {
    getAccountList(
        function (data) {
            var accounts = data.records,
                html = '';
            for (var i=0; i<accounts.length; i++) {
                html += '<li class="table-view-cell"><a href="#accounts/'+ accounts[i].Id +'">' + accounts[i].Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Accounts</h1>' +
                    '<a href="#account/create">' + 'New Account' + '</a>'+
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view session-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showAccountDetails(accountId) {

    getAccountDetails(accountId,
        function (data) {
            var contacts = data.records,
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Contacts</h1>' +
                '</header>' +
                '<div class="content">';
            for(var key in contacts) {
              html += '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">Name: ' +
                                '<h4>' + contacts[key].LastName +' '+ (contacts[key].FirstName || '') + '</h4>' +
                            '</li>' +
                            '<li class="table-view-cell">Email: ' +
                                (contacts[key].Email || '') +
                            '</li>' +
                            '<li class="table-view-cell">Account Name: ' +
                                (contacts[key].Account.Name) +
                            '</li>' +
                        '</ul>' +
                    '</div>';
            }
                    
            html +='</div>'+
              '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showCreateAccount() {
  html = '<form>'+
  'Account Name: <input type="text" id="accountName" name="fname"><br>'+
  '<input type="submit" value="Save" onclick="createAccount()">'+
  '</form>';
  slider.slidePage($(html));
  return false;
}

function createAccount() {
  var data = {Name : document.getElementById("accountName").value};
  force.create('Account',data);
  showAccountList();
  return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showAccountList);
router.addRoute('accounts/:id', showAccountDetails);
router.addRoute('account/create',showCreateAccount);
