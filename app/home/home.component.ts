import { Component, OnInit, NgZone } from '@angular/core';
import * as Geolocation from "nativescript-geolocation";
import { Couchbase} from "nativescript-couchbase";
import { Accuracy } from "ui/enums";

@Component({
	selector: 'home',
	moduleId: module.id,
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
	public latitude: number;
	public longitude: number;
	private watchId: number;
	private db: any;
	public dbDataArray: Array<any> = [];
	public lastLocation: any;
	public distance:number = 0

	public constructor(private zone: NgZone){
		this.latitude = 0;
		this.longitude = 0;
		this.db = new Couchbase("testdb");
	}
	ngOnInit() {
		this.updateLocation();
	 }
	//  ngOnChanges(){
	// 	 alert("Hooray");
	//  }

	private getLocation(): Promise<any>{
		return new Promise((resolve, reject) => {
			Geolocation.enableLocationRequest().then(() => {
				Geolocation.getCurrentLocation(
					{
						timeout: 10000,
						desiredAccuracy: Accuracy.high
					})
				.then(location => {
                    resolve(location);
                }).catch(error => {
                    reject(error);
                });
            });
		})
	}

	public updateLocation() {
        this.getLocation().then(result => {
            this.latitude = result.latitude;
			this.longitude = result.longitude;
			this.startWatchingLocation();
        }, error => {
            console.error(error);
        });
	}
	
	public startWatchingLocation() {
        this.watchId = Geolocation.watchLocation(location => {
            if(location) {
                this.zone.run(() => {
					this.latitude = location.latitude;
					this.longitude = location.longitude;
					var doc = this.db.createDocument({
						"timestamp": location.timestamp,
						"Lat": this.latitude,
						"Long": this.longitude
					});
					this.showDbData(doc,location);
                });
            }
        }, error => {
			console.error(error);
        }, { updateDistance: 1, minimumUpdateTime: 1000 });
	}
	
	public showDbData (doc, location) {
		this.dbDataArray.push(this.db.getDocument(doc));
	}

	public stopWatchingLocation() {
        if(this.watchId) {
            Geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }



	
}