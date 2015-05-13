$(document).ready(function () {
//    localStorage.clear();
//    sessionStorage.clear();
    loadList();
    //Új list átirányítás
    $("#btnAddList").click(function ()
    {
        //Change to the add-lists
        $.mobile.changePage($("#add-lists"));
        $("#listTitle").val("");
        $("#listElement").val("");
        $("#listTitle").focus();
    });



    //Click Handlers for Add Lists page
    //Save button 
    $("#btnSaveList").click(function ()
    {
        $("#listElement").removeProp('disabled');
        listTitle = $("#listTitle").val();
        if (listTitle !== "")
        {
            localStorage.setItem(listTitle, "");
            alert("A lista mentve. ");
            loadList();
        }
        else
        {
            alert("A \"Lista neve\" mezőt kötelezően ki kell tölteni!");
        }
    });

    //Clear button
    $("#btnClearLists").click(function ()
    {
        $("#listTitle").val("");
        $("#listElement").val("");
        $("#listTitle").focus();
    });

    //New element button
    $("#btnNewElement").click(function ()
    {
        var title = document.getElementById("listTitle").value.toString();
        var element = document.getElementById("listElement").value.toString();
        var val = localStorage.getItem(title);
        val += element + "|false;";
        localStorage.setItem(title, val);
        alert("A tétel elmetve.");
        $("#listElement").val("");
       
    });

    //Click Handlers for View List page
    $("#clearListBtn").click(function ()
    {
        var key = document.getElementById("cim").innerHTML;
        localStorage.removeItem(key);
        alert("A lista törölve.");
        loadList();
        $.mobile.changePage($("#home"));
        // egy lista törlése
//       localStorage.clear();
//       $("#list-of-lists").html("");
//       alert("Az összes lista törölve.");
    });
});

function loadList() {
    $("#list-of-lists").html("");
    for (i = 0; i <= localStorage.length - 1; i++)
    {
        key = localStorage.key(i);
        var div = document.createElement("div");
        var element = document.createElement("input");
        element.setAttribute("type", "button");
        element.setAttribute("value", key);
        element.setAttribute("id", key);
        element.setAttribute("role", "button");
        element.onclick = function () {
            var item = this.value.toString();
            document.getElementById("cim").innerHTML = item;
            $.mobile.changePage($("#view-list"));
            lista(item);
        };
        div.appendChild(element);
        $("#list-of-lists").append(div);
    }
}


function lista(kulcs)
{
    $("#listView").html("");
    var data = localStorage.getItem(kulcs);
    var arr = data.split(';');
    var ul = $('<ul data-type="edit" id="nagyonegyedi"></ul>');
    for (var i = 0; i < arr.length - 1; i++) {
        var temp = arr[i].split('|');
        var el;
        if (temp[1] === "true") {
            el = $('<li><label class="pack-checkbox danger"><input type="checkbox" value="' + temp[0] + '" onclick="checkChecked(this)" checked=""></input><span></span></label><p>' + temp[0] + '</p><button value="' + temp[0] + '" class="btntorol" onclick="deleteElement(this.value)" data-role="button">Törlés</button></li>');
        }
        else {
            el = $('<li><label class="pack-checkbox danger"><input type="checkbox" value="' + temp[0] + '" onclick="checkChecked(this)"></input><span></span></label><p>' + temp[0] + '</p><button value="' + temp[0] + '" class="btntorol" onclick="deleteElement(this.value)" data-role="button">Törlés</input></li>');
        }
        ul.append(el);
    }
    $("#listView").append(ul);
    $("#listView").append($('<hr/>'));
    $("#listView").append($('<input type=text id="addelement" placeholder="Új elem"></input>'));
    $("#listView").append($('<button id="elementsave" onclick="addElement()">Mentés</button>'));
}

function addElement()
{
   
    var element = document.getElementById("addelement").value.toString();
    var title = document.getElementById("cim").innerHTML;
    var val = localStorage.getItem(title);
    val += element + "|false;";
    localStorage.setItem(title, val);
    alert("A tétel elmetve.");
    $("#addelement").val("");
    lista(title);
}


function deleteElement(param)
{
    var kulcs = document.getElementById("cim").innerHTML;
    var data = localStorage.getItem(kulcs);
    var arr = data.split(';');
    for (var i = 0; i < arr.length - 1; i++) {
        var temp = arr[i].split('|');
        if (temp[0].valueOf() === param.valueOf())
        {
            data = data.replace(arr[i] + ';', "");
        }
    }
    localStorage.setItem(kulcs, data);
    lista(kulcs);
}

function checkChecked(param)
{
    var kulcs = document.getElementById("cim").innerHTML;
    var data = localStorage.getItem(kulcs);
    var arr = data.split(';');
    for (var i = 0; i < arr.length - 1; i++) {
        var temp = arr[i].split('|');
        if (temp[0].valueOf() === param.value)
        {
            if (temp[1].valueOf() === "false")
            {

                data = data.replace(arr[i] + ';', temp[0] + '|true;');
            }
            else
            {
                data = data.replace(arr[i] + ';', temp[0] + '|false;');
            }
        }
    }
    localStorage.setItem(kulcs, data);
    lista(kulcs);

}