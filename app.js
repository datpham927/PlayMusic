
const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const listMusic=$(".list")
const cdTitle=$(".header_title h1")
const cdImg=$(".header_img img")
const cd=$(".header_img")
const audio=$("#audio")
const playMusic=$(".play")
const right=$(".right")
const left=$(".left")
const shuffle=$(".shuffle")
const repeat=$(".repeat")
const progress =$(".progress")
const progressCurrent =$(".progressCurrent")



const app={
    playBoole:false,
    currentIndex:0,
    isShuffle:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem("keys")) || {},
    songs:[
        {
            title:"Ngôi Sao Cô Đơn",
            singer:"Jack - J97",
            path:"./music/nscd.mp3",
            img:"https://img.theinfluencer.vn/thumb_w/850/uploads/2022/07/oqoFCoJCODsBjBzOkfd6IEpJUkrYnLZjKLM7eBpV.png"
        },    {
            title:"Đom Dóm",
            singer:"Jack - J97",
            path:"./music/dd.mp3",
            img:"https://i.ytimg.com/vi/4CCGI83vOVo/maxresdefault.jpg"
        },
        {
            title:"Lỡ Hẹn Với Dòng Lam",
            singer:"Thái Học",
            path:"./music/lhdsl.mp3",
            img:"https://i.ytimg.com/vi/HELjXqg9Ht0/mqdefault.jpg"
        },
        {
            title:"Cơn Mưa Băng Giá",
            singer:"Noo Phước Thịnh",
            path:"./music/cmbg.mp3",
            img:"https://1.bp.blogspot.com/-hJTd5K2_TVg/YSLqmi3Er7I/AAAAAAAATyY/rsWzPhqTZuU7ukFTNcadK7zzG41ccWdJgCNcBGAsYHQ/s0/hayvnnet-o-day-co-nhieu-gai-xinh-dang-dep-%2B%25281%2529.jpg"
        },  
        {
            title:"Em Là Con Thuyền Cô Đơn",
            singer:"Thái Học",
            path:"./music/nscd.mp3",
            img:"https://i.ytimg.com/vi/orFNbppc6_0/maxresdefault.jpg"
        }, 
        {
            title:"Lặng Yên",
            singer:"Bùi Anh Tuấn ft. Ái Phương",
            path:"./music/langyen.mp3",
            img:"https://icdn.dantri.com.vn/2021/05/29/2-mua-lua-chin-1622224483750.jpg"
        },
        {
            title:"Về Bên Anh",
            singer:"Jack - J97",
            path:"./music/vba.mp3",
            img:"https://i.ytimg.com/vi/EjrIz5UX4Io/maxresdefault.jpg"
        }
        ,    {
            title:"Đom Dóm",
            singer:"Jack - J97",
            path:"./music/dd.mp3",
            img:"https://i.ytimg.com/vi/4CCGI83vOVo/maxresdefault.jpg"
        },
        {
            title:"Lỡ Hẹn Với Dòng Lam",
            singer:"Thái Học",
            path:"./music/lhdsl.mp3",
            img:"https://i.ytimg.com/vi/HELjXqg9Ht0/mqdefault.jpg"
        },
        {
            title:"Cơn Mưa Băng Giá",
            singer:"Noo Phước Thịnh",
            path:"./music/cmbg.mp3",
            img:"https://1.bp.blogspot.com/-hJTd5K2_TVg/YSLqmi3Er7I/AAAAAAAATyY/rsWzPhqTZuU7ukFTNcadK7zzG41ccWdJgCNcBGAsYHQ/s0/hayvnnet-o-day-co-nhieu-gai-xinh-dang-dep-%2B%25281%2529.jpg"
        },  
        {
            title:"Em Là Con Thuyền Cô Đơn",
            singer:"Thái Học",
            path:"./music/nscd.mp3",
            img:"https://i.ytimg.com/vi/orFNbppc6_0/maxresdefault.jpg"
        }, 
        {
            title:"Lặng Yên",
            singer:"Bùi Anh Tuấn ft. Ái Phương",
            path:"./music/langyen.mp3",
            img:"https://icdn.dantri.com.vn/2021/05/29/2-mua-lua-chin-1622224483750.jpg"
        },
        {
            title:"Về Bên Anh",
            singer:"Jack - J97",
            path:"./music/vba.mp3",
            img:"https://i.ytimg.com/vi/EjrIz5UX4Io/maxresdefault.jpg"
        }
    
    ],
    setConfig:function(key, value) {
        this.config[key] = value;
        localStorage.setItem("keys",JSON.stringify(this.config));
      },
     render:function(){
        var html=this.songs.map((item,index)=>{
            return ` <li class="music" data-index=${index}>
                        <div class="music_img">
                            <img src="${item.img}" alt="">
                        </div>
                        <div class="music_des">
                            <h1>${item.title}</h1>
                            <small>${item.singer}</small>
                        </div>  
                        <div class="music_icon">
                             <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </li> `
        })
        listMusic.innerHTML=html.join("")
        this.listColor()
     },

    //  ==================================
        handelMusic:function(){
                const _this=this
                //animation cd
                const animationCd=cdImg.animate({transform:"rotate(360deg)"},{
                    duration:10000,
                    iterations:Infinity
                });
                animationCd.pause()
                    // play song
                playMusic.onclick=function(){
                    if(_this.playBoole){
                    audio.pause()
                    
                    }else{
                        audio.play()
                        
                    }
                }
                // event khi play
                audio.onplay=function(){
                    _this.playBoole=true
                    playMusic.classList.add("action")
                    animationCd.play()
                }
                // event khi pause
                audio.onpause=function(){
                    _this.playBoole=false
                    playMusic.classList.remove("action")
                        animationCd.pause()
                }
                
                //chuyển bài 
                right.onclick=function(){
                    if(_this.isShuffle){
                        _this.random()
                    }else{
                        if(_this.currentIndex==_this.songs.length-1){
                            _this.currentIndex=0
                        }else{
                            _this.currentIndex++;
                            _this.loadCurrentSong()
                            _this.listColor()
                            audio.play()
                            _this.scrollToActiveSong()

                        }
                    }
                }
                left.onclick=function(){
                    if(_this.isShuffle){
                        _this.random()
                    }else{
                        if(_this.currentIndex==0){
                            _this.currentIndex=_this.songs.length-1
                        }else{
                            _this.currentIndex--;
                            _this.loadCurrentSong()
                            _this.listColor()
                            audio.play()
                            _this.scrollToActiveSong()

                        }
                    }  
                }
                const cdImgHeight=cd.offsetHeight
                // lắng nghe sự kiện khi scroll
                window.onscroll=function(){
                    const scrollTop=document.documentElement.scrollTop;
                var cdImgHeightNew=cdImgHeight-scrollTop
                        cd.style.width=cdImgHeightNew > 0 ? cdImgHeightNew+"px" : 0
                        cd.style.height=cdImgHeightNew > 0 ? cdImgHeightNew+"px" : 0
                        cd.style.opacity=cdImgHeightNew/cdImgHeight
                }
                //  -------- ngẫu nhiên -----------
                shuffle.onclick=function(){
                    _this.isShuffle=!_this.isShuffle
                    this.classList.toggle("color",_this.isShuffle)
                    _this.setConfig("isShuffle",_this.isShuffle)
                }
                // ============= repeat ===========
                repeat.onclick=function(){
                    _this.isRepeat=!_this.isRepeat
                    repeat.classList.toggle("color",_this.isRepeat)
                    _this.setConfig("isRepeat",_this.isRepeat)

                }
                // ==============   khi tua =================
                audio.ontimeupdate=function(){
                    progressCurrent.style.width=audio.currentTime/audio.duration*100+"%"

                }
                    const progressWidth=progress.clientWidth
                progress.onclick=function(e){
                    let progressClick=e.offsetX
                    let progressNew=progressClick/progressWidth*100
                    progressCurrent.style.width=progressNew+"%"
                    audio.currentTime=progressNew*audio.duration/100
                    audio.play()
                }
                audio.onended=function(){
                    if(_this.isRepeat){
                        audio.play()
                    }else{
                        right.click()
                    }
                }
                
                listMusic.onclick=function(e){
                    var target=e.target.closest(".music:not(.music_color)")
                    if(target){
                        if(target){
                            var dataIndex=Number(target.getAttribute("data-index"))
                    }
                            _this.currentIndex=dataIndex
                            _this.loadCurrentSong()
                            _this.listColor()
                            audio.play()
                        }
                    }

                    
  },
        // ======== random ==============
        random:function(){
            let randomMusic=0
            do{
                randomMusic=Math.floor(Math.random()*(this.songs.length))

            }while(randomMusic==this.currentIndex)
            this.currentIndex=randomMusic
            this.loadCurrentSong()
            this.listColor()
            audio.play()
        },
    
    // ===================================

     defineProperty:function(){
        Object.defineProperty(this,"currentSong",{
               get:function(){
                return this.songs[this.currentIndex]
               }
        })
     },
    //  =====================================

     loadCurrentSong:function(){
       cdTitle.innerText=this.currentSong.title
       cdImg.src=this.currentSong.img
       audio.src=this.currentSong.path
     },
    
      //   ================================
      listColor:function(){
          $$(".music").forEach((item,index)=>{
            if(index==this.currentIndex){
                item.classList.add("music_color")
            } else{
                item.classList.remove("music_color")
            }
        })
      },
    
      loadConfig:function(){
          this.isRepeat=this.config.isRepeat
          this.isShuffle=this.config.isShuffle
      },
      scrollToActiveSong:function(){
        setTimeout(()=>{
         $(".music.music_color").scrollIntoView({
            behavior :"smooth",
            inline : "center",
            block:"start",
         })
        },300)
    },
    start:function(){
        this.loadConfig()
        this.render()
        this.defineProperty()
        this.loadCurrentSong()
        this.handelMusic()
        this.listColor()
        repeat.classList.toggle("color",this.isRepeat)
        shuffle.classList.toggle("color",this.isShuffle)
    }
}
app.start()
