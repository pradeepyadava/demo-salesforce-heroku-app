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
            var contact = data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
            '<h1 class="title">Contacts</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">Name: ' +
                                '<h4>' + contact.FirstName + '</h4>' +
                                '<p>' + (contact.LastName || 'No time yet')+ '</p>' +
                            '</li>' +
                            '<li class="table-view-cell">Email: ' +
                                contact.Email +
                            '</li>' +
                            '<li class="table-view-cell">Account Name: ' +
                                (contact.Account.Name) +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showAccountList);
router.addRoute('accounts/:id', showAccountDetails);
