let row = `<tr>
<td><input type="text" id="subject" aria-label="f" /></td>
<td><input type="text" id="Scored" aria-label="f" /></td>
<td><input type="text" id="total" aria-label="f" /></td>
<td><button>Delete</button></td>
</tr>`;
let bd = document.getElementById("bd");
let subject_id = "su";
let scored_id = "sc";
let total_id = "to";
let collaction=[]
let data;
let num=0;

add =()=>{
    num++;
    collaction.push( `<tr>
    <td><input type="text" id="${subject_id+num}" aria-label="f" /></td>
    <td><input type="text" id="${scored_id+num}" aria-label="f" /></td>
    <td><input type="text" id="${total_id+num}" aria-label="f" /></td>
    <td><button id="${num}" onclick="del(${num})">Delete</button></td>
    </tr>`);
    dis();
    // console.log(num)
}

dis = ()=>{
    data = ""
    collaction.forEach(element => {
        data += element;
     });
     console.log(collaction)
     bd.innerHTML = data;
     console.log(document.getElementById("su1").value)
}

del = (posi) =>{
// collaction.splice(posi,1)
posi = posi -1;
delete collaction[posi]
dis()
}
add();
