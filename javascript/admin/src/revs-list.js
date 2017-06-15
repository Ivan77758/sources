
// -- Список отзывов ---
var revs_list = {

    init: function ()
    {
        $('#review-list .revs_up').on('click',revs_list.ajax.up);
        $('#review-list .revs_down').on('click',revs_list.ajax.down);
        $('#review-all-bad').on('click',revs_list.actions.allBad);
    } ,

    ajax: {

        up: function ()
        {
            var id  = $(this).data('num');
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: 1 } );
            revs_list.actions.mod(id,1);
            revs_list.actions.toggleUp(id);
        } ,

        down: function ()
        {
            var id  = $(this).data('num');
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: -1 } );
            revs_list.actions.mod(id,-1);
            revs_list.actions.toggleDown(id);
        }

    } ,

    actions: {
        mod: function (id,mod) {
            var rank = $('#revs_rank_'+id).text() * 1 + mod;
            var vote = $('#revs_vote_'+id).text() * 1 + 1;
            $('#revs_rank_'+id).text(rank);
            $('#revs_vote_'+id).text(vote);
            $('#review-item-'+id).data('voted', 1);
        },
        allBad: function () {
            $('.revs_down').filter(function () {
                var id = $(this).data('num');
                var voted = $('#review-item-'+id).data('voted');
                return voted ? 0 : 1;
            }).click();
        },
        toggleUp: function (id) {
            $('.revs_up').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-primary btn-success disabled');
        },
        toggleDown: function (id) {
            $('.revs_up').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-primary btn-default');
            $('.revs_down').filter(function () {return $(this).data('num') == id;}).toggleClass('btn-default btn-danger disabled');
        },

    }
}

