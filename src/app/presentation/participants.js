/**
 * Created by bolehivsky on 19.06.14.
 */
participants = function(){}

participants.prototype.del = function(){

}
participants.prototype.add = function (id) {
    console.log('participants.add ' + id);
    this.model.set('list.'+id,1);
    console.log(this.model.get());
}
participants.prototype.formatList = function (model){
    console.log('participants.formatList');

    return [];
}

participants.prototype.init = function () {
    console.log('participants list init');
    console.log(this.model.get('list'));
}
module.exports = participants;