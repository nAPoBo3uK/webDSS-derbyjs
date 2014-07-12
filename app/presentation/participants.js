/**
 * Created by bolehivsky on 19.06.14.
 */
participants = function(){}

participants.prototype.add = function (id, name) {
    console.log('participants.add ' + id);
    this.model.set('list.'+id,{id:id,name:name,role:true});
    console.log(this.model.get());
}

participants.prototype.deleteAll = function (){
    console.log('deleteAll');
    this.model.set('data',{});
}

participants.prototype.delete = function (id){
    console.log('delete');
    this.model.del('data.'+id);
}

participants.prototype.init = function () {
    console.log('participants list init');
    var model=this.model;
    model.subscribe('data', function() {
        var filter = model.filter('data', 'all')
        filter.ref('_page.plist');
    });
}
module.exports = participants;