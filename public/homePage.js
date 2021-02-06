
const button = new LogoutButton();
button.action = function () {
   ApiConnector.logout(response => {
      if (response.success) {
         location.reload()
      }
   })
};
ApiConnector.current(response => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
   }
});
const rates = new RatesBoard();
function getStoc() {
   ApiConnector.getStocks(response => {
      if (response.success) {
         rates.clearTable();
         rates.fillTable(response.data)
      }
   })
};
getStoc();
setInterval(getStoc, 60000);

const moneyMan = new MoneyManager();
moneyMan.addMoneyCallback = function (data) {
   ApiConnector.addMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyMan.setMessage(response.success, "Done");
      } else {
         moneyMan.setMessage(response.success, response.error);
      }
   })
};
moneyMan.conversionMoneyCallback = function (data) {
   ApiConnector.convertMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyMan.setMessage(response.success, "Done");
      } else {
         moneyMan.setMessage(response.success, response.error);
      }
   })
}

moneyMan.sendMoneyCallback = function (data) {
   ApiConnector.transferMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
         moneyMan.setMessage(response.success, "Done");
      } else {
         moneyMan.setMessage(response.success, response.error);
      }
   })
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(response => {
   if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyMan.updateUsersList(response.data);
   }
})
favorites.addUserCallback = function (data) {
   ApiConnector.addUserToFavorites(data, response => {
      if (response.success) {
         favorites.clearTable();
         favorites.fillTable(response.data);
         moneyMan.updateUsersList(response.data);
         favorites.setMessage(response.success, "Done");
      } else {
         favorites.setMessage(response.success, response.error);
      }
   })
}
favorites.removeUserCallback = function (data) {
   ApiConnector.removeUserFromFavorites(data, response => {
      if (response.success) {
         favorites.clearTable();
         favorites.fillTable(response.data);
         moneyMan.updateUsersList(response.data);
         favorites.setMessage(response.success, "Done");
      } else {
         favorites.setMessage(response.success, response.error);
      }
   })
};
//console.log(moneyMan.addMoneyCallba;ck);