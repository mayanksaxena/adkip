var PIKDA = {
	config: {
		youtube: {
			key: 'AIzaSyCfTyeMW-UZefl5hJuDMF3mWnvZwPYWJ_Q',
			q: ''
		}
	},
	search: {
		youtube: function (q, key, callback) {
			$.ajax({
			    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+q+'&key='+key,
			    type: "GET",
			    success: callback
			});
		},
		processData: function(data) {
			if(typeof data !== "undefined" 
				&& typeof data.items !== "undefined" 
				&& data.items instanceof Array) {
				$('body .container').html('');
				for(var i in data.items) {
					$('body .container').append("<img title='"+data.items[i].snippet.title+"' height='100' width='100' src='"+data.items[i].snippet.thumbnails.medium.url+"' />");
				}
			}
		}
	},
	start: function(searchID, submitID) {
		this.searchElement = searchID;
		this.submitID = submitID;
		this.bindEvents();
	},
	bindEvents: function() {
		var self = this;
		$(self.submitID).click(function() {
			if($(self.searchElement).val().length > 0) {
				self.search.youtube($(self.searchElement).val(), self.config.youtube.key, function(data) {
					self.search.processData(data);
				});
			}
		});
	}
};