let tiles;
let box = document.querySelector("#box")
let tilesposition=[]
let temp;
let click = true;
let congrats = document.querySelector("#congrats");
congrats.remove();
let developer = document.querySelector("#developer")
function assign_positions(){
    for(let i=1;i<=8;i++){
        while(true){
            let n = parseInt(Math.random()*8);
            if(tilesposition.includes(n)){
                continue;
            }
            else{
                tilesposition.push(n)
                break;
            }
        }
    }
}
function insert_all_tiles(){
    for(let i=0;i<8;i++){
        let pos = tilesposition[i]
        let element = document.createElement('div')
        element.setAttribute('class','tiles')
        element.setAttribute('id',`tile${i+1}`)
        element.innerText = pos+1;
        box.appendChild(element)
    }

    let element = document.createElement('div')
    element.setAttribute('class','tiles')
    element.classList.add('blank')
    element.setAttribute('id','tile9')
    element.innerText = '';
    box.appendChild(element)

    tiles = document.querySelectorAll('.tiles')
    tilesposition.push(-1)
}
function check_right_or_wrong(){
    for(let i=0;i<9;i++){
        if(tiles[i].id == `tile${tiles[i].innerText}`){
            tiles[i].classList.add("right")
            tiles[i].classList.remove("wrong")
        }
        else{
            tiles[i].classList.add("wrong")
            tiles[i].classList.remove("right")
        }
    }
}
function check_left(i){
    if(i==0 || i==3 || i==6){
        return false;
    }
    else if(tiles[i-1].innerText == ''){
        return true;
    }
    else{
        return false;
    }
}
function check_right(i){
    if(i==2 || i==5 || i==8){
        return false;
    }
    else if(tiles[i+1].innerText == ''){
        return true;
    }
    else{
        return false;
    }
}
function check_top(i){
    if(i==0 || i==1 || i==2){
        return false;
    }
    else if(tiles[i-3].innerText == ''){
        return true;
    }
    else{
        return false;
    }
}
function check_bottom(i){
    if(i==6 || i==7 || i==8){
        return false;
    }
    else if(tiles[i+3].innerText == ''){
        return true;
    }
    else{
        return false;
    }
}
function move_left(i){
    tiles[i].classList.add("animation")
            temp = tiles[i].id
            tiles[i].id = tiles[i-1].id
            tiles[i-1].id = temp
            setTimeout(() => {
                tiles[i].classList.remove("animation")
                temp = tiles[i].id
                tiles[i].id = tiles[i-1].id
                tiles[i-1].id = temp

                tiles[i].classList.add("blank")
                tiles[i-1].classList.remove("blank")

                temp = tiles[i].innerText
                tiles[i].innerText = tiles[i-1].innerText
                tiles[i-1].innerText = temp
                check_right_or_wrong()
            }, 500);

}
function move_up(i){
    tiles[i].classList.add("animation")
            temp = tiles[i].id
            tiles[i].id = tiles[i-3].id
            tiles[i-3].id = temp

            setTimeout(() => {
                tiles[i].classList.remove("animation")
                temp = tiles[i].id
                tiles[i].id = tiles[i-3].id
                tiles[i-3].id = temp

                tiles[i].classList.add("blank")
                tiles[i-3].classList.remove("blank")

                temp = tiles[i].innerText
                tiles[i].innerText = tiles[i-3].innerText
                tiles[i-3].innerText = temp
                check_right_or_wrong()

            }, 500);
}
function move_right(i){
    tiles[i].classList.add("animation")
            temp = tiles[i].id
            tiles[i].id = tiles[i+1].id
            tiles[i+1].id = temp

            setTimeout(() => {
                tiles[i].classList.remove("animation")
                temp = tiles[i].id
                tiles[i].id = tiles[i+1].id
                tiles[i+1].id = temp

                tiles[i].classList.add("blank")
                tiles[i+1].classList.remove("blank")
            
                temp = tiles[i].innerText
                tiles[i].innerText = tiles[i+1].innerText
                tiles[i+1].innerText = temp
                check_right_or_wrong()
            }, 500);
}
function move_down(i){
    tiles[i].classList.add("animation")
            temp = tiles[i].id
            tiles[i].id = tiles[i+3].id
            tiles[i+3].id = temp
            setTimeout(() => {
                tiles[i].classList.remove("animation")
                temp = tiles[i].id
                tiles[i].id = tiles[i+3].id
                tiles[i+3].id = temp


                tiles[i].classList.add("blank")
                tiles[i+3].classList.remove("blank")
            
                temp = tiles[i].innerText
                tiles[i].innerText = tiles[i+3].innerText
                tiles[i+3].innerText = temp
                check_right_or_wrong()

            }, 500);

}
function is_solvable(){
    let sum =0;
    for(let i =0;i<7;i++){
        let count = 0;
        for(let j=i+1;j<8;j++){
            if(tilesposition[j] > tilesposition[i])
            {
                count++
            }
        }
        sum = sum + count;
    }
    if(sum%2==0){
        return true;
    }
    else{
        return false
    }
}
function check_for_win(){
    for(let tile of tiles){
        if(tile.innerText=='')
        {
            continue;
        }
        else if(tile.id != `tile${tile.innerText}`)
        {
            return false;
        }
    }
    return true;
}
function click_enable(){
    for(let i=0;i<9;i++){
        tiles[i].addEventListener("click",(e)=>{
            if(click == true){
                if(check_left(i)){
                    move_left(i)
                }
                else if(check_top(i)){
                    move_up(i)
                }
                else if(check_right(i)){
                    move_right(i)
                }
                else if(check_bottom(i)){
                    move_down(i)
                }
                else{}
        
                if(check_for_win()){
                    click=false;
                    setTimeout(() => {
                        developer.before(congrats)
                    }, 400);
                }
            }
        })
    } 
}



assign_positions()
if(is_solvable()){
    insert_all_tiles()
}
else{
    window.location.reload()
}
check_right_or_wrong()
if(check_for_win()){
    click = false;
    setTimeout(() => {
        developer.before(congrats)
    }, 400);
}
click_enable()

    
   



