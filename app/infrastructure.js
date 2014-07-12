/**
 * Created by bolehivsky on 02.07.14.
 */
module.exports = function (app){

    app.proto.addNew = function(namespace){
        console.log('addNew ' + namespace);
        var model = this.model;
        var newRecord = model.get('_page.new');
        console.log(newRecord);
        if (!newRecord) return;
        newRecord.owner = model.get('_session.userId');
        switch(namespace){
            case 'votings':
                newRecord.timeCreated = (new Date()).getTime();
                newRecord.participants = {};
                break;
            case 'users':
                break;
        }
        model.add(namespace, newRecord);
        this.model.del('_page.new');
    };


    app.proto.newItem = function(){
        console.log('@@@')
        var entity = this.model.get('$render.ns');
        this.model.set('_state.' + entity + '.new', {});
        this.model.set('_state.' + entity + '.mode', 'new');
    }

    app.proto.delListItem = function (id){
        console.log('delList Item ' + id);
        var model = this.model;
        var entityName = model.get('$render.ns');
        model.del(entityName +'.' + id);
        if(model.get('_state.'+entityName+'.selected.id') == id)
            model.del('_state.'+entityName+'.selected');
        app.page.redirect('/')
    }

    app.proto.getUser = function(id){
        var user = this.model.get('auths.'+id +'.local');
        if(user)
            return {
                name: user.username,
                email: user.email,
                specialism: user.specialism,
                description: user.description
            }
    }

    app.proto.startVoting = function(voting){
        console.log('start voting ' + voting.id);
        this.model.set('votings.' + voting.id +'.timeStarted', (new Date()).getTime());
    }
    app.proto.viewResults = function(){
        this.model.set('_page.viewResults', this.model.get('_page.viewResults')?false:true);
    }/*
    app.proto.invertRange = function(range){
        console.log('@');
        console.log(range)
    //TODO: Убрать костыль
        var newRange =[];
        for(var p in range)
            if(p!='length')
                newRange[p] = range[p];
        var maxRank = range.length-1;
        var result =[];
        var newRank = 0;
        for(var i=maxRank; i>=0; i--){
            var indexOfRank = newRange.indexOf(i);
            console.log(indexOfRank);
            if(indexOfRank == -1){console.log('indexofranknotfound');
                return [];
            } else {
                result[indexOfRank] = newRank++
            }
        }
        return result;

    }*//*
    app.proto.resultRange = function(range){
        var maxRank = range.length-1;
        var result = [];
        for(var i =0; i<maxRank; i++)

        return this.model.get('_page.view.candidats.'+(range.indexOf(maxRank)+1));
    }*/
    app.proto.formatDate = function(date){
        if(date){
            var d = new Date(date);

            var dd = d.getDate();
            if (dd<10) dd= '0'+dd;

            var mm = d.getMonth() + 1;  // месяц 1-12
            if (mm<10) mm= '0'+mm;

            var yy = d.getFullYear() % 100;
            if (yy<10) yy= '0'+yy;

            return dd+'.'+mm+'.'+yy;
        }

    }
    app.proto.stopVoting = function(voting){
        for(var p in voting.participants){
            this.model.del('votings.'+voting.id+'.participants.'+p+'.vote');
        }
        this.model.del('votings.'+voting.id+'.timeStarted');
    }
}
