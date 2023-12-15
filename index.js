// var array = [1,2,3]

// var string = 'asdasd'

// var number = 132

// var boolean = true

// var object = {name:'rati', lastname:'gugutishvili'}

var objarray = [
    {name:'rati', lastname:'gugutishvili', blonde:false, amount:700},
    {name:'irakli', lastname:'kvantaliani',blonde:false, amount:900},
    {name:'akaki', lastname:'janelidze',blonde:true, amount:1000},
    {name:'cameron', lastname:'diaz',blonde:true, amount:300},
    {name:'giorgi', lastname:'mtiulishvili',blonde:true, amount:100}
]

objarray.forEach((rame)=>{


    if(rame.amount > 700)
    {
        return
    }



    console.log(rame.name);
})

