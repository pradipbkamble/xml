
let cl=console.log;
cardxml=document.getElementById("cardxml");
formd= document.getElementById("formcontainer");
titlecontr= document.getElementById("title");
bodycont= document.getElementById("body");
user=document.getElementById("userid");

 let BaseUrl= `https://jsonplaceholder.typicode.com`

 let Posturl=`${BaseUrl}/posts`;
 let arr1=[];
let templating= (temp) =>{
    let result="";
    temp.forEach(elem => {
       result +=`
       
        <div class="col-md-6 offset-md-3">
        <div class="card mb-2">
            <div class="card-header">
             <h3>${elem.title}</h3>
            </div>
            <div class="card-body">
                <p>${elem.body}</p>
            </div>

         <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-primary">edit</button>
            <button class="btn btn-danger">delet</button>
         </div>   
        </div>
    </div>`
    });

    cardxml.innerHTML=result;
};


let func= ()=>{
    let xhr= new XMLHttpRequest();

 xhr.open(`GET`, Posturl ,true );
 xhr.send();
 xhr.onload= function(){
   // cl(xhr.response)
    if(xhr.status === 200){
    arr1=JSON.parse(xhr.response)
      cl(arr1)
        templating(arr1)
    }
 };
}
func();
let onsubmit=(eve)=>{
eve.preventDefault();
let cardobj={
    title: titlecontr.value,
    body: bodycont.value,
    userid: user.value,
}
cl(cardobj)
let xhr=new XMLHttpRequest();
xhr.open("POST",Posturl,true);
xhr.send(JSON.stringify(cardobj));
xhr.onload=function() {
if(xhr.status===200 || xhr.status===201){

    arr1.id=JSON.parse(xhr.response).id;
arr1.push(cardobj);
templating(arr1);
Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
}
else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
}
}


}




formd=addEventListener("submit",onsubmit);

 