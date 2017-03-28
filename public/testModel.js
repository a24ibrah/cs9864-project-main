// By Ahmed Ibrahim
// Stock Mystery Project
var ViewModel = function(services) {
    var self = this;
    self.services = ko.observableArray(services);

    self.refresh = function(newServices) {
        self.services(newServices);
    }
};

$.get( "/getServices", function(data) {
    var viewModel = new ViewModel(data);
    ko.applyBindings(viewModel);
    setInterval(function(){
        $.get( "/getServices", function(newServices) {
            viewModel.refresh(newServices);
        });
    }, 3000);
});
