import { menuArray } from './data.js'
//import { finalOrder } from './finalorder'

let totalSectionArray = []
renderTotalPrice()

//populates the item on the menu
function getMenuItems(){
    let menuItems = ""

    menuArray.forEach(function(item){
        menuItems +=

        `<div class="menu-item">
            <div class="icon">${item.emoji}</div>
                <div class="menu-text">
                    <h2>${item.name}</h2>
                    <p class="gray margin-bottom">${item.ingredients}</p>
                    <h3>${item.price}</h3>
                </div>
            <div class="button-container">
                <button data-add="${item.id}" class="add">+</button>
            </div>
        </div>`
    })

    document.getElementById("menu-list").innerHTML = menuItems 
}

getMenuItems()


//event listeners
document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        handleAddingItem(e.target.dataset.add)
    }
    if (e.target.dataset.remove){
        handleRemovingItem(e.target.dataset.remove)
    }
})

//adding menu items to the order
function handleAddingItem(itemId){
    //match the itemID with the item the user clicks
    const targetMenuObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    //increment the quantity on the object
    targetMenuObj.quantity++
    //if the quantity = 1 on the selected object it will add it to the totalSectionArray
    if (targetMenuObj.quantity == 1) {
        totalSectionArray.push(targetMenuObj)
    }
    //runs the function that iterates through the order array
    handleTotalSectionChange()
    
    //update the DOM to the correct quantity
    document.getElementById(`quantity-${itemId}`).textContent = targetMenuObj.quantity
    
}

function handleRemovingItem(itemId){

    //match the itemID with the item the user clicks
    const targetOrderObj = totalSectionArray.filter(function(item){
        return item.id == itemId
    })[0]
  
    //decrement the quantity on the object
    targetOrderObj.quantity--
     if (targetOrderObj.quantity === 0){
        
        removeMenuItemfromTotal(itemId)
    }
  

    handleTotalSectionChange()

    document.getElementById(`quantity-${itemId}`).textContent = targetMenuObj.quantity
    //handle changing the total for the individual item

}
//this function changes the value of the totalSectionArray to contain every item in the total section that does not
//match the item ID selected
function removeMenuItemfromTotal(itemId){
    const tempObject = totalSectionArray.filter(function(item){
       return item.id != itemId
    })
    //changing the totalSectionArray to tempObject
    totalSectionArray =[...tempObject]
}

//Renders the total section
function handleTotalSectionChange(){
    const totalItemEl = document.getElementById("total-item-container")

   

    let tempTotalItem = ""
    //looping through the totalSection Array
     for (let section of totalSectionArray) {
        
        //creating an HTML string for every section/object that is looped through
        tempTotalItem += `<div id="total-item-${section.id}" class="total-item">
            <h2>${section.name}</h2>
            <p id="quantity-${section.id}">${section.quantity}</p>
            <button class="remove-btn" data-remove="${section.id}"type="button">remove</button>
            <div class ="pricing">
            <h3 class"float-price">${section.price * section.quantity}
            </div>
            </div>`
     }

     totalItemEl.innerHTML = tempTotalItem

     renderTotalPrice()


    
    
}


function renderTotalPrice(){
    let totalCount = 0
   for (let section of totalSectionArray){
    totalCount += section.quantity * section.price

   }
   document.getElementById("total-price").innerText = totalCount
}
