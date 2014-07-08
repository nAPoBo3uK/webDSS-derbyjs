/**
 * Created by bolehivsky on 09.07.14.
 */
module.exports = VotingTable;
    function VotingTable(){}

VotingTable.prototype.up = function (index) {
    console.log('Up candidat ' + index);
    var vote = this.model.get('vote');
    var rank = vote[index];
    if(rank<(vote.length-1)){
        vote[vote.indexOf(rank+1)]--;
        vote[index]++;
        this.model.set('vote', vote);
    }

}

VotingTable.prototype.down = function (index) {
    console.log('down candidat ' + index);
    var vote = this.model.get('vote');
    var rank = vote[index];
    if(rank>0){
        vote[vote.indexOf(rank-1)]++;
        vote[index]--;
        this.model.set('vote', vote);
    }
}

VotingTable.prototype.init = function () {
    console.log('voting table init');
    var vote = [];
    if(!this.model.get('vote')) {
        console.log('@')
        var count = this.model.get('table').length - 1;
        for (var i = 0; i < count; i++) {
            vote.push(i);
        }
        this.model.set('vote', vote);
    }

}