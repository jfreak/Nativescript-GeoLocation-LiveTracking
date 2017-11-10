"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Geolocation = require("nativescript-geolocation");
var nativescript_couchbase_1 = require("nativescript-couchbase");
var enums_1 = require("ui/enums");
var HomeComponent = (function () {
    function HomeComponent(zone) {
        this.zone = zone;
        this.dbDataArray = [];
        this.distance = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.db = new nativescript_couchbase_1.Couchbase("testdb");
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.updateLocation();
    };
    //  ngOnChanges(){
    // 	 alert("Hooray");
    //  }
    HomeComponent.prototype.getLocation = function () {
        return new Promise(function (resolve, reject) {
            Geolocation.enableLocationRequest().then(function () {
                Geolocation.getCurrentLocation({
                    timeout: 10000,
                    desiredAccuracy: enums_1.Accuracy.high
                })
                    .then(function (location) {
                    resolve(location);
                }).catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    HomeComponent.prototype.updateLocation = function () {
        var _this = this;
        this.getLocation().then(function (result) {
            _this.latitude = result.latitude;
            _this.longitude = result.longitude;
            _this.startWatchingLocation();
        }, function (error) {
            console.error(error);
        });
    };
    HomeComponent.prototype.startWatchingLocation = function () {
        var _this = this;
        this.watchId = Geolocation.watchLocation(function (location) {
            if (location) {
                _this.zone.run(function () {
                    _this.latitude = location.latitude;
                    _this.longitude = location.longitude;
                    var doc = _this.db.createDocument({
                        "timestamp": location.timestamp,
                        "Lat": _this.latitude,
                        "Long": _this.longitude
                    });
                    _this.showDbData(doc, location);
                });
            }
        }, function (error) {
            console.error(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
    };
    HomeComponent.prototype.showDbData = function (doc, location) {
        this.dbDataArray.push(this.db.getDocument(doc));
    };
    HomeComponent.prototype.stopWatchingLocation = function () {
        if (this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            moduleId: module.id,
            templateUrl: './home.component.html'
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRDtBQUMxRCxzREFBd0Q7QUFDeEQsaUVBQWtEO0FBQ2xELGtDQUFvQztBQVFwQztJQVNDLHVCQUEyQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpoQyxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUU3QixhQUFRLEdBQVUsQ0FBQyxDQUFBO1FBR3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxrQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLEtBQUs7SUFFRyxtQ0FBVyxHQUFuQjtRQUNDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDeEMsV0FBVyxDQUFDLGtCQUFrQixDQUM3QjtvQkFDQyxPQUFPLEVBQUUsS0FBSztvQkFDZCxlQUFlLEVBQUUsZ0JBQVEsQ0FBQyxJQUFJO2lCQUM5QixDQUFDO3FCQUNGLElBQUksQ0FBQyxVQUFBLFFBQVE7b0JBQ0UsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO29CQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBQUEsaUJBUUM7UUFQTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUMxQixLQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVNLDZDQUFxQixHQUE1QjtRQUFBLGlCQWlCQztRQWhCTSxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBQSxRQUFRO1lBQzdDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO29CQUNwQyxJQUFJLEdBQUcsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQzt3QkFDaEMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxTQUFTO3dCQUMvQixLQUFLLEVBQUUsS0FBSSxDQUFDLFFBQVE7d0JBQ3BCLE1BQU0sRUFBRSxLQUFJLENBQUMsU0FBUztxQkFDdEIsQ0FBQyxDQUFDO29CQUNILEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLEVBQUUsVUFBQSxLQUFLO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLGtDQUFVLEdBQWpCLFVBQW1CLEdBQUcsRUFBRSxRQUFRO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLDRDQUFvQixHQUEzQjtRQUNPLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7SUE1RVEsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7U0FDcEMsQ0FBQzt5Q0FXZ0MsYUFBTTtPQVQzQixhQUFhLENBaUZ6QjtJQUFELG9CQUFDO0NBQUEsQUFqRkQsSUFpRkM7QUFqRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBHZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBDb3VjaGJhc2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtY291Y2hiYXNlXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ1aS9lbnVtc1wiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdob21lJyxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdHB1YmxpYyBsYXRpdHVkZTogbnVtYmVyO1xuXHRwdWJsaWMgbG9uZ2l0dWRlOiBudW1iZXI7XG5cdHByaXZhdGUgd2F0Y2hJZDogbnVtYmVyO1xuXHRwcml2YXRlIGRiOiBhbnk7XG5cdHB1YmxpYyBkYkRhdGFBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuXHRwdWJsaWMgbGFzdExvY2F0aW9uOiBhbnk7XG5cdHB1YmxpYyBkaXN0YW5jZTpudW1iZXIgPSAwXG5cblx0cHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKXtcblx0XHR0aGlzLmxhdGl0dWRlID0gMDtcblx0XHR0aGlzLmxvbmdpdHVkZSA9IDA7XG5cdFx0dGhpcy5kYiA9IG5ldyBDb3VjaGJhc2UoXCJ0ZXN0ZGJcIik7XG5cdH1cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy51cGRhdGVMb2NhdGlvbigpO1xuXHQgfVxuXHQvLyAgbmdPbkNoYW5nZXMoKXtcblx0Ly8gXHQgYWxlcnQoXCJIb29yYXlcIik7XG5cdC8vICB9XG5cblx0cHJpdmF0ZSBnZXRMb2NhdGlvbigpOiBQcm9taXNlPGFueT57XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdEdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRHZW9sb2NhdGlvbi5nZXRDdXJyZW50TG9jYXRpb24oXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dGltZW91dDogMTAwMDAsXG5cdFx0XHRcdFx0XHRkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2hcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQudGhlbihsb2NhdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXHRcdH0pXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlTG9jYXRpb24oKSB7XG4gICAgICAgIHRoaXMuZ2V0TG9jYXRpb24oKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLmxhdGl0dWRlID0gcmVzdWx0LmxhdGl0dWRlO1xuXHRcdFx0dGhpcy5sb25naXR1ZGUgPSByZXN1bHQubG9uZ2l0dWRlO1xuXHRcdFx0dGhpcy5zdGFydFdhdGNoaW5nTG9jYXRpb24oKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuXHR9XG5cdFxuXHRwdWJsaWMgc3RhcnRXYXRjaGluZ0xvY2F0aW9uKCkge1xuICAgICAgICB0aGlzLndhdGNoSWQgPSBHZW9sb2NhdGlvbi53YXRjaExvY2F0aW9uKGxvY2F0aW9uID0+IHtcbiAgICAgICAgICAgIGlmKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuXHRcdFx0XHRcdHRoaXMubG9uZ2l0dWRlID0gbG9jYXRpb24ubG9uZ2l0dWRlO1xuXHRcdFx0XHRcdHZhciBkb2MgPSB0aGlzLmRiLmNyZWF0ZURvY3VtZW50KHtcblx0XHRcdFx0XHRcdFwidGltZXN0YW1wXCI6IGxvY2F0aW9uLnRpbWVzdGFtcCxcblx0XHRcdFx0XHRcdFwiTGF0XCI6IHRoaXMubGF0aXR1ZGUsXG5cdFx0XHRcdFx0XHRcIkxvbmdcIjogdGhpcy5sb25naXR1ZGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnNob3dEYkRhdGEoZG9jLGxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0sIHsgdXBkYXRlRGlzdGFuY2U6IDEsIG1pbmltdW1VcGRhdGVUaW1lOiAxMDAwIH0pO1xuXHR9XG5cdFxuXHRwdWJsaWMgc2hvd0RiRGF0YSAoZG9jLCBsb2NhdGlvbikge1xuXHRcdHRoaXMuZGJEYXRhQXJyYXkucHVzaCh0aGlzLmRiLmdldERvY3VtZW50KGRvYykpO1xuXHR9XG5cblx0cHVibGljIHN0b3BXYXRjaGluZ0xvY2F0aW9uKCkge1xuICAgICAgICBpZih0aGlzLndhdGNoSWQpIHtcbiAgICAgICAgICAgIEdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godGhpcy53YXRjaElkKTtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cdFxufSJdfQ==