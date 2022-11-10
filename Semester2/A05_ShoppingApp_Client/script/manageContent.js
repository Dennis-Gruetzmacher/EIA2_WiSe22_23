"use strict";
var A05_ShoppingHelper;
(function (A05_ShoppingHelper) {
    async function startGenerateContent(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
        let shoppingJSON = response.json();
        let shoppingList = JSON.parse(shoppingJSON);
        generateContent(shoppingList);
    }
    A05_ShoppingHelper.startGenerateContent = startGenerateContent;
    function generateContent(_shoppingList) {
        let listSpace = document.getElementById("list_space");
        for (let i = 0; i < _shoppingList.Liste.length; i++) {
            let newProductDiv = document.createElement("div");
            newProductDiv.classList.add("item_box");
            newProductDiv.setAttribute("id", "item-" + i);
            listSpace.appendChild(newProductDiv);
            let newProductName = document.createElement("p");
            newProductName.classList.add("product");
            newProductName.innerHTML = _shoppingList.Liste[i].product;
            newProductDiv.appendChild(newProductName);
            let newPurchaseDate = document.createElement("p");
            newPurchaseDate.classList.add("date");
            newPurchaseDate.innerHTML = "zuletzt am " + _shoppingList.Liste[i].lastPurchase;
            newProductDiv.appendChild(newPurchaseDate);
            let newAmount = document.createElement("input");
            newAmount.setAttribute("type", "number");
            newAmount.setAttribute("min", "0");
            newAmount.setAttribute("id", "amountField_" + i);
            newAmount.classList.add("amount_item");
            newAmount.value = _shoppingList.Liste[i].quantity;
            newProductDiv.appendChild(newAmount);
            let newComment = document.createElement("textarea");
            newComment.classList.add("comment");
            newComment.setAttribute("id", "commentTextarea_" + i);
            newComment.value = _shoppingList.Liste[i].comment;
            newProductDiv.appendChild(newComment);
            let newStatusButton = document.createElement("i");
            newStatusButton.classList.add("fa-solid");
            newStatusButton.classList.add("fa-circle");
            newStatusButton.classList.add("button");
            newStatusButton.setAttribute("id", "StatusButtonId_" + i);
            newProductDiv.appendChild(newStatusButton);
            let newUpdateItemButton = document.createElement("button");
            newUpdateItemButton.classList.add("status_item");
            newUpdateItemButton.classList.add("button");
            newUpdateItemButton.setAttribute("id", "updateButtonID_" + i);
            newUpdateItemButton.innerHTML = "Änderungen übernehmen";
            newProductDiv.appendChild(newUpdateItemButton);
            let newTrashButton = document.createElement("i");
            newTrashButton.classList.add("fa-solid");
            newTrashButton.classList.add("fa-trash");
            newTrashButton.classList.add("button");
            newTrashButton.setAttribute("id", "TrashButtonId_" + i);
            newProductDiv.appendChild(newTrashButton);
            newStatusButton.addEventListener("click", changeItemStatus);
            newUpdateItemButton.addEventListener("click", updateItem);
            newTrashButton.addEventListener("click", deleteItem);
        }
    }
    A05_ShoppingHelper.generateContent = generateContent;
    function destroyContent(_shoppingList) {
        for (let i = 0; i < _shoppingList.Liste.length; i++) {
            let currentItemDiv = document.getElementById("item-" + i);
            currentItemDiv.remove();
        }
    }
    A05_ShoppingHelper.destroyContent = destroyContent;
    function deleteItem() {
        let activeID = parseInt(getButtonID());
        destroyContent(shoppingList);
        shoppingList.Liste.splice(activeID, 1);
        generateContent(shoppingList);
    }
    function updateItem() {
        let newAmountString = document.getElementById("amountField_" + getButtonID()).value;
        let newCommentString = document.getElementById("commentTextarea_" + getButtonID()).value;
        shoppingList.Liste[getButtonID()].quantity = parseInt(newAmountString);
        shoppingList.Liste[getButtonID()].comment = newCommentString;
        destroyContent(shoppingList);
        generateContent(shoppingList);
    }
    function changeItemStatus() {
        let ActiveButton = document.getElementById("StatusButtonId_" + getButtonID());
        let ActiveID = parseInt(getButtonID());
        if (shoppingList.Liste[ActiveID].inCart == false && shoppingList.Liste[ActiveID].bought == false) {
            ActiveButton.classList.add("fa-cart-shopping");
            ActiveButton.classList.remove("fa-circle");
            shoppingList.Liste[ActiveID].inCart = true;
        }
        else if (shoppingList.Liste[ActiveID].inCart == true && shoppingList.Liste[ActiveID].bought == false) {
            ActiveButton.classList.add("fa-check");
            ActiveButton.classList.remove("fa-cart-shopping");
            shoppingList.Liste[ActiveID].bought = true;
        }
        else {
            ActiveButton.classList.add("fa-circle");
            ActiveButton.classList.remove("fa-check");
            shoppingList.Liste[ActiveID].inCart = false;
            shoppingList.Liste[ActiveID].bought = false;
        }
    }
    function getButtonID() {
        let activeItem = document.querySelector(".button:hover").getAttribute("id");
        let activeItemIDString = activeItem.split("_");
        let activeID = activeItemIDString[1];
        return activeID;
    }
})(A05_ShoppingHelper || (A05_ShoppingHelper = {}));
//# sourceMappingURL=manageContent.js.map