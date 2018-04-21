
Page({
  data: {
    store: [{ id: '0', img: "../../img/store/njxd2.jpg", name: "那间小店", storetype: "实体店", phone: "581355482", address: "桂庙新村118号", price: "36", food: ["../../img/store/njxd2.jpg", "../../img/store/njxd3.jpeg", "../../img/store/njxd4.jpeg", "../../img/store/njxd5.jpeg"] },
      { id: '1',img: "../../img/store/lyb.jpg", name: "来一煲", storetype: "外卖/实体店", phone: "293355482", address: "桂庙新村", price: "20", food: [] },
      { id: '2',img: "../../img/store/zhss.jpg", name: "中华寿司", storetype: "外卖/实体店", phone: "545685482", address: "桂庙新村小清新街", price: "28", food: [] }],
    storetemp: { id:"",img: "", name: "", storetype: "", phone: "", address: "", price: "", food: [""] ,picktimes:""},
    pickstorelist:[{id:'0',times:7},{id:'2',times:18}]
  },
  onLoad: function (options) {
    var spsl={}
    var s = this.data.store;
    for(var i=0;i<s.length;i++){
      if(s[i].id.indexOf(options.id)!==-1){
        spsl=s[i];
        break;
      }
    }
    var psl = this.data.pickstorelist;
    for(var i=0;i<psl.length;i++){
      if(psl[i].id.indexOf(options.id)!==-1){
        spsl.picktimes=psl[i].times;
      }
    }
    console.log(spsl);
    this.setData({
      storetemp: spsl
    })
  }
})
