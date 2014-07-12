/**
 * Created by bolehivsky on 09.07.14.
 */
module.exports = VotingTable;
    function VotingTable(){}


VotingTable.prototype.up = function (index) {
    console.log('up candidat ' + index);
    var editvote = this.model.get('editvote');
     var prev = index==0?editvote.length-1:index-1;
     exchange(editvote, index, prev);
    this.model.set('editvote', editvote);
}

VotingTable.prototype.down = function (index) {
    console.log('down candidat ' + index);
    var editvote = this.model.get('editvote');
    var prev = index<editvote.length-1?index+1:0;
    exchange(editvote, index, prev);
    this.model.set('editvote', editvote);
}

VotingTable.prototype.save = function(){
    console.log('voting table save');
    this.model.set('vote', invertRange(this.model.get('editvote')));
    this.model.set('enable', false);
}
VotingTable.prototype.init = function () {
    console.log('voting table init');
    var editvote;
    var vote;
    if(vote = this.model.get('vote')) { // user already voted
        this.model.set('enable', false); // disable voting mode
        editvote = invertRange(vote); // and show user vote
    } else { //
        console.log('@')
        editvote = [];
        var count = this.model.get('table').length - 1;
        for (var i = 0; i < count; i++) {
            editvote.push(i);
        }
        this.model.set('enable', 'true'); // enable voting mode
    }
    this.model.set('editvote', editvote);
}
function exchange (arr, first, second ){
    var tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;

}
function invertRange(range){
    var maxRank = range.length-1;
    var newRank = 0;
    var newRange = [];
    for(var rank=maxRank; rank>=0; rank--){
        newRange[range.indexOf(rank)] = newRank++;
    }
    return newRange;

}