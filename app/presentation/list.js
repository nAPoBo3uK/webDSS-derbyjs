/**
 * Created by bolehivsky on 29.06.14.
 */
var list = function (){}

list.prototype.select = function(index){
    console.log('want to view ' + index);
    this.emit('view', this.model.get('data.'+index+'.id'));
}

list.prototype.delete = function(index){
    console.log('want to delete ' + index);
    this.emit('delete', this.model.get('data.'+index+'.id'));

}

list.prototype.getNew= function(){
    console.log('want new');
    this.emit('newitem');

}
list.prototype.setParticipant = function(user){
    console.log('setParticipant ' + user.id);
    this.emit('transfer', user.id, user.local.username);
}

list.prototype.init = function(){
    console.log('list init');
}

module.exports = list;