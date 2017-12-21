webpackJsonp([13],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__multiple_multiple__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__address_address__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__history_history__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__map_map__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__checkout_checkout__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__payments_payments__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__myaccount_myaccount__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_barcode_scanner__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var MainPage = (function () {
    function MainPage(nav, navParams, loadingCtrl, menuCtrl, connect, zone, alertCtrl, cdr, barcodeScanner) {
        this.nav = nav;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.connect = connect;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.barcodeScanner = barcodeScanner;
        this.myPic = './assets/img/blankbanner.jpg';
        this.total = 0;
        this.itemcount = 0;
        this.orderTotal = 0;
        this.freightAmount = 0;
        this.freightValid = false;
        this.userPostcode = '';
        this.mytext = '';
        this.orderitems = [];
        this.mytext = '';
    }
    MainPage.prototype.recalc = function () {
        if (window.localStorage.getItem('freightValid'))
            this.freightValid = true;
        else
            this.freightValid = false;
        if (window.localStorage.getItem('userPostcode'))
            this.userPostcode = window.localStorage.getItem('userPostcode');
        else
            this.userPostcode = '';
        this.orderitems = [];
        this.total = 0;
        this.itemcount = 0;
        var c = window.localStorage.getItem('cart');
        if (!c) {
            c = '';
            window.localStorage.setItem('cart', "");
        }
        if (c.length) {
            this.menuCtrl.enable(true, 'mainmenu');
            var i = c.split('~');
            for (var e = 0; e < i.length; e++) {
                var f = i[e].split('^');
                var ths = { id: f[0], qty: f[1], pic: 'http://theparcelpeople.com.au/catalogue/pics/' + f[0] + '.jpg', title: f[3], price: f[2], company: f[4] };
                this.orderitems.push(ths);
                this.total += parseFloat(f[1]) * parseFloat(f[2]);
                this.itemcount += parseInt(f[1]);
                this.myPic = 'http://theparcelpeople.com.au/catalogue/banners/' + f[4] + '.jpg?v=3';
            }
            this.orderTotal = this.total + this.freightAmount;
        }
    };
    MainPage.prototype.ionViewDidEnter = function () {
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    MainPage.prototype.pleaseSignUpAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Join Tella',
            subTitle: 'Sign up to Tella and experience a new era in online shopping',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        //           this.nav.setRoot(HomePage);
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.showAccount = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_12__myaccount_myaccount__["a" /* MyaccountPage */]);
    };
    MainPage.prototype.calcShip = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Calculate Shipping',
            subTitle: 'What is the PostCode where your order will be sent?',
            inputs: [
                { name: 'postcode',
                    placeholder: this.userPostcode
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: function (data) {
                        _this.doCalcShip(data.postcode);
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.doCalcShip = function (p) {
        var _this = this;
        if (!p.length)
            p = this.userPostcode;
        window.localStorage.setItem('userPostcode', p);
        if (p.length) {
            var that_1 = this;
            var loader_1 = this.loadingCtrl.create({
                content: "Calculating..."
            });
            loader_1.present();
            var url = 'calcship.php?postcode=' + p + '&cart=' + window.localStorage.getItem('cart');
            console.log(url);
            this.connect.getList(url).subscribe(function (data) {
                loader_1.dismiss();
                that_1.zone.run(function () {
                    console.log(JSON.stringify(data));
                    if (data.success) {
                        that_1.freightAmount = data.freight;
                        window.localStorage.setItem('freightValid', '1');
                        that_1.recalc();
                        that_1.cdr.markForCheck();
                    }
                });
            }, function (err) {
                loader_1.dismiss();
                _this.connect.logError(err);
            });
        }
    };
    MainPage.prototype.noAvailable = function () {
        var alert = this.alertCtrl.create({
            title: 'Tella Message',
            subTitle: 'The item that you scanned is no longer available.  Please scan another code.',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.conflictWarning = function () {
        var alert = this.alertCtrl.create({
            title: 'Tella Message',
            subTitle: 'The item that you scanned is not compatible with your current shopping cart.  Please complete your existing order before starting a new one.',
            buttons: [
                {
                    text: 'OK',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.signOutAlert = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            subTitle: '',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: function () {
                        that.doLogout();
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.doLogout = function () {
        window.localStorage.removeItem('userTag');
        window.localStorage.removeItem('cart');
    };
    MainPage.prototype.doScan = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (!barcodeData.cancelled) {
                _this.checkCode(barcodeData.text);
            }
        }, function (err) {
        });
    };
    MainPage.prototype.loadText = function () {
        this.checkCode('*' + this.mytext);
    };
    MainPage.prototype.checkCode = function (s) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Searching..."
        });
        loader.present();
        var url = 'getitems.php?code=' + s + '&cart=' + window.localStorage.getItem('cart');
        // console.log(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.mytext = '';
            that.zone.run(function () {
                switch (parseInt(data.number)) {
                    case -1:
                        that.conflictWarning();
                        break;
                    case 1:
                        _this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: data.item, buttonmode: 'ADD TO CART' });
                        break;
                    case 0:
                        that.noAvailable();
                        break;
                    default:
                        window.localStorage.removeItem('toadd');
                        _this.nav.push(__WEBPACK_IMPORTED_MODULE_4__multiple_multiple__["a" /* MultiplePage */], { items: data.items });
                }
            });
        }, function (err) {
            loader.dismiss();
            that.mytext = '';
            _this.connect.logError(err);
        });
    };
    MainPage.prototype.showProfile = function () {
        var that = this;
        if (window.localStorage.getItem('userTag')) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_5__account_account__["a" /* AccountPage */]);
        }
        else
            this.pleaseSignUpAlert();
    };
    MainPage.prototype.showPayments = function () {
        var that = this;
        if (window.localStorage.getItem('userTag')) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_11__payments_payments__["a" /* PaymentsPage */]);
        }
        else
            this.pleaseSignUpAlert();
    };
    MainPage.prototype.showAddress = function () {
        var that = this;
        if (window.localStorage.getItem('userTag')) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_6__address_address__["a" /* AddressPage */]);
        }
        else
            this.pleaseSignUpAlert();
    };
    MainPage.prototype.doMap = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_8__map_map__["a" /* MapPage */]);
    };
    MainPage.prototype.removeProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] != id)
                nw.push(i[e]);
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    MainPage.prototype.addProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] != id)
                nw.push(i[e]);
            else {
                var q = parseInt(a[1]) + 1;
                a[1] = q.toString();
                nw.push(a.join('^'));
            }
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    MainPage.prototype.subProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] == id) {
                var q = parseInt(a[1]) - 1;
                if (q > 0)
                    a[1] = q.toString();
            }
            nw.push(a.join('^'));
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    MainPage.prototype.checkOut = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_10__checkout_checkout__["a" /* CheckoutPage */]);
    };
    MainPage.prototype.tandc = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_9__tandc_tandc__["a" /* TandcPage */]);
    };
    MainPage.prototype.goProd = function (m) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: m, buttonmode: '' });
    };
    MainPage.prototype.orderHistory = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__history_history__["a" /* HistoryPage */]);
    };
    return MainPage;
}());
MainPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-main',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/main/main.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<button ion-button menuToggle color="dark"><ion-icon name="menu"></ion-icon></button>\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-menu id="mainmenu" [content]="myMenum" style="overflow:hidden" [persistent]=true >\n	<ion-content class="menucontainer">\n		<ion-item-group class="paddingMenu">\n			<button ion-item (click)="doScan()" class="list-item menuitems" menuClose>\n			   Scan Product\n			</button>\n			<button ion-item (click)="doMap()" class="list-item menuitems" menuClose>\n			   Find Local Offers\n			</button>\n\n			<button ion-item (click)="showAccount()" class="list-item menuitems" menuClose>\n			   Your Account\n			</button>\n			<button ion-item (click)="orderHistory()" class="list-item menuitems" menuClose>\n			   Order History\n			</button>\n			<button ion-item (click)="tandc()" class="list-item menuitems" menuClose>\n			   Terms & Conditions\n			</button>\n		\n			<button ion-item (click)="signOutAlert()" class="list-item menuitems" menuClose>\n			   Sign Out\n			</button>\n			\n		</ion-item-group>\n	</ion-content>\n</ion-menu>\n\n<ion-content #myMenum text-center>\n<div *ngIf="!orderitems.length">\n\n<ion-grid>\n <ion-row text-center>\n  <ion-col col-2>\n  </ion-col>\n  <ion-col col-8>\n    <img src="./assets/img/background.jpg" style="width:100%">\n  </ion-col>\n  <ion-col col-2>\n  </ion-col>\n </ion-row>\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-2>\n</ion-col>\n<ion-col col-8>\n<ion-item no-lines text-wrap text-center>\n<p>Tella is the instant purchasing app that allows you to shop simply by scanning barcodes in a catalogue or magazine.</p>\n</ion-item>\n</ion-col>\n<ion-col col-2>\n</ion-col>\n</ion-row>\n<ion-row text-center style="margin-top:20px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button block color="danger"  (click)="doScan();">START SCANNING</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="primary" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n</div>\n<div *ngIf="orderitems.length">\n\n<img [src]="myPic" style="width:100%">\n<ion-grid>\n<ion-row text-center style="margin-top:10px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button block color="danger"  (click)="doScan()">Scan Another Item</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="primary" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n  <ion-grid>\n  <ion-row class="myborder" no-padding>\n  <ion-col col-12 no-padding>\n  <ion-item-divider text-center no-padding style="font-weight:bold">Your Cart Summary</ion-item-divider>\n  </ion-col>\n  </ion-row>\n  <ion-row class="myborder">\n  <ion-col col-8 text-left>\n  {{ itemcount }} item(s)\n  </ion-col>\n  <ion-col col-4 text-right>\n  ${{ total | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n   <ion-col col-8 (click)="calcShip()" text-left>\n     Ship To {{ userPostcode }} <div class="calcship">(Change)</div>\n  </ion-col>\n  <ion-col col-4 text-right>\n     ${{ freightAmount | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n  <ion-col col-8 text-left>\n    TOTAL\n  </ion-col>\n  <ion-col col-4 text-right>\n    ${{ orderTotal | number:\'1.2-2\' }}\n  </ion-col>\n </ion-row>\n <ion-row *ngIf="!freightValid" clss="myBorder">\n <ion-col col-12 text-center><ion-item text-center no-lines (click)="calcShip()" class="calcship">Calculate Shipping</ion-item></ion-col>\n </ion-row>\n </ion-grid>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n\n</ion-grid>\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of orderitems"  class="borderBottomGainsboroAlpha">\n<ion-grid>\n <ion-row>\n  <ion-col col-4 (click)="goProd(et)"><img [src]="et.pic" style="border:1px solid gainsboro"></ion-col>\n  <ion-col col-8><p class="cartitem" (click)="goProd(et)">{{ et.title }}</p>\n    <p class="cartitem price">${{ et.price }}</p>\n\n   <ion-grid>\n      <ion-row>\n        <ion-col col-10>\n           <p class="cartitem"><span class="updown" (click)="subProduct(et.id);">-</span><span class="updown"> {{ et.qty }} </span><span class="updown" (click)="addProduct(et.id);">+</span></p>\n        </ion-col>\n        <ion-col col-2 text-right>\n           <ion-icon name="close-circle-outline" style="color:gray" (click)="removeProduct(et.id);"></ion-icon>\n        </ion-col>\n      </ion-row>\n   </ion-grid>\n  \n\n  </ion-col>\n </ion-row>\n</ion-grid>\n			</ion-item>\n		</ion-list>\n\n</div>\n</ion-content>\n\n<ion-footer>\n<div *ngIf="orderitems.length">\n<button ion-button color="secondary" full (click)="checkOut()">CHECK OUT</button>\n</div>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/main/main.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
], MainPage);

//# sourceMappingURL=main.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MultiplePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MultiplePage = (function () {
    function MultiplePage(nav, navParams, view, connect, zone, alertCtrl, cdr) {
        this.nav = nav;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.anychosen = false;
        this.items = [];
        this.bannerImg = './assets/img/blankbanner.jpg';
        this.items = this.navParams.get('items');
        for (var ss in this.items)
            this.bannerImg = 'http://theparcelpeople.com.au/catalogue/banners/' + this.items[ss].company + '.jpg';
    }
    MultiplePage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    MultiplePage.prototype.recalc = function () {
        var c = window.localStorage.getItem('toadd');
        if (!c)
            c = '';
        this.anychosen = false;
        if (c.length)
            for (var ss in this.items) {
                if (this.items[ss].id == c)
                    this.items[ss].added = 1;
                if (this.items[ss].added == 1)
                    this.anychosen = true;
            }
        console.log('any=' + this.anychosen);
    };
    MultiplePage.prototype.AddToCart = function () {
        var c = window.localStorage.getItem('cart');
        if (!c)
            c = '';
        for (var ss in this.items)
            if (this.items[ss].added > 0)
                c = "" + this.items[ss].id + "^1^" + this.items[ss].price + "^" + this.items[ss].title + "^" + this.items[ss].company + (c.length ? '~' : '') + c;
        window.localStorage.setItem('cart', c);
        this.nav.pop();
    };
    MultiplePage.prototype.selectProduct = function (pos) {
        for (var ss in this.items)
            if (this.items[ss].pos == pos)
                this.items[ss].added = 1;
        this.anychosen = true;
    };
    MultiplePage.prototype.unselectProduct = function (pos) {
        this.anychosen = false;
        for (var ss in this.items) {
            if (this.items[ss].pos == pos)
                this.items[ss].added = 0;
            if (this.items[ss].added == 1)
                this.anychosen = true;
        }
    };
    MultiplePage.prototype.goProduct = function (item) {
        window.localStorage.removeItem('toadd');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: item, buttonmode: (item.added == 0 ? 'SELECT' : '') });
    };
    MultiplePage.prototype.closeme = function () {
        this.nav.pop();
    };
    return MultiplePage;
}());
MultiplePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-multiple',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/multiple/multiple.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerImg" style="width:90%">\n</ion-col>\n</ion-row>\n\n\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of items" class="borderBottomGainsboroAlpha">\n				\n<ion-grid>\n<ion-row>\n<ion-col col-4>\n 					<img [src]="et.pic" (click)="goProduct(et);">\n</ion-col><ion-col col-8>\n					<h1 class="textDodger fontSize10" (click)="goProduct(et);">{{ et.title }}</h1>\n<p class="price">${{ et.price }}</p>\n<div *ngIf="et.added==0">\n <div *ngIf="et.qty>0">\n   <button ion-button small color="secondary" (click)="selectProduct(et.pos);" outline>Select</button>\n </div>\n <div *ngIf="et.qty<1">\n   <button ion-button small color="danger">Sold Out</button>\n </div>\n</div>\n<div *ngIf="et.added>0">\n <button ion-button small color="secondary" (click)="unselectProduct(et.pos);" >Selected</button>\n</div>\n <div *ngIf="et.added<0">\n   <button ion-button small color="primary">Already In Cart</button>\n </div>\n\n</ion-col>\n</ion-row>\n</ion-grid>\n				\n			</ion-item>\n		</ion-list>\n</ion-content>\n<ion-footer  *ngIf="anychosen">\n<button ion-button full (click)="AddToCart()" color="secondary">ADD TO CART</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/multiple/multiple.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], MultiplePage);

//# sourceMappingURL=multiple.js.map

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connect = (function () {
    function Connect(http) {
        this.http = http;
        this.server_url = 'http://theparcelpeople.com.au/catalogue/server/';
        this.server2 = 'http://theparcelpeople.com.au/catalogue/server/';
    }
    Connect.prototype.PostQuery = function (object, parameter) {
        return this.http.get(this.server_url + object + parameter).map(function (res) { return res.json(); });
    };
    Connect.prototype.getList = function (object) {
        return this.http.get(this.server_url + object).map(function (res) { return res.json(); });
    };
    Connect.prototype.getList2 = function (object) {
        return this.http.get(this.server2 + object).map(function (res) { return res.json(); });
    };
    Connect.prototype.logError = function (err) {
        console.error('Error: ' + err);
    };
    Connect.prototype.getServerUrl = function () {
        return this.server_url;
    };
    return Connect;
}());
Connect = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
], Connect);

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccountPage = (function () {
    function AccountPage(navCtrl, navParams, alertCtrl, view, asc, connect, zone, cdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.view = view;
        this.asc = asc;
        this.connect = connect;
        this.zone = zone;
        this.cdr = cdr;
        this.mprofile = { id: 0, firstName: '', lastName: '', email: '', gender: '', phone: '' };
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        this.connect.getList('accountdata.php?id=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.mprofile = data.profile;
                console.log(that.mprofile);
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    AccountPage.prototype.chooseGender = function () {
        var actionSheet = this.asc.create({
            title: 'Gender',
            buttons: [
                {
                    text: 'Male',
                    role: 'cancel',
                    handler: function () {
                    }
                }, {
                    text: 'Female',
                    role: 'cancel',
                    handler: function () {
                    }
                }, {
                    text: 'Other',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AccountPage.prototype.saveAlert = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Your Profile has been updated',
            buttons: [
                {
                    text: 'Okay',
                    handler: function () {
                        that.view.dismiss();
                    }
                }
            ]
        });
        alert.present();
    };
    AccountPage.prototype.infoAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    AccountPage.prototype.closeme = function () {
        this.view.dismiss();
    };
    AccountPage.prototype.saveme = function () {
        var _this = this;
        var that = this;
        var url = 'saveaccountdata.php?params=' + JSON.stringify(this.mprofile);
        console.log(url);
        this.connect.getList(url).subscribe(function (data) {
        }, function (err) { return _this.connect.logError(err); }, function () {
            _this.saveAlert();
        });
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-account',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/account/account.html"*/'<ion-header>\n	<ion-navbar hideBackButton color="blue">\n    <ion-buttons left><button ion-button (click)="closeme()">Cancel</button></ion-buttons>\n		<ion-title text-center text-center>My Profile</ion-title>\n		<ion-buttons right><button ion-button (click)="saveme()">Save</button></ion-buttons>\n	</ion-navbar>\n</ion-header>\n<ion-content no-scroll>\n	<div  class="maxWidth480">\n		<ion-grid no-padding>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>First Name</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.firstName"></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Last Name</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.lastName"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Phone Number</ion-label>\n						<ion-input type="tel" [(ngModel)]="mprofile.phone"  ></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Gender</ion-label>\n						<ion-select [(ngModel)]="mprofile.gender">\n							<ion-option value="F">Female</ion-option>\n							<ion-option value="M">Male</ion-option>\n							<ion-option value="O">Other</ion-option>\n						</ion-select>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Email</ion-label>\n						<ion-input type="email" [(ngModel)]="mprofile.email" disabled></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/account/account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddressPage = (function () {
    function AddressPage(navCtrl, navParams, platform, connect, view, zone, cdr, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.connect = connect;
        this.view = view;
        this.zone = zone;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
    }
    AddressPage.prototype.delete = function (id) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.connect.getList('getaddress.php?did=' + id + '&tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                loader.dismiss();
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    AddressPage.prototype.loadAddress = function () {
        var _this = this;
        var that = this;
        this.connect.getList('getaddress.php?tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    AddressPage.prototype.makeDefault = function (id) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.connect.getList('getaddress.php?fid=' + id + '&tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                loader.dismiss();
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    AddressPage.prototype.ionViewDidEnter = function () {
        this.loadAddress();
    };
    AddressPage.prototype.showEnterAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__["a" /* EnterAddressPage */]);
    };
    AddressPage.prototype.closeme = function () {
        this.navCtrl.pop();
    };
    AddressPage.prototype.returnToMain = function () {
        this.navCtrl.pop();
    };
    return AddressPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('navbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Navbar */])
], AddressPage.prototype, "navBar", void 0);
AddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-address',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/address/address.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Addresses</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n		<ion-item-sliding *ngFor="let m of methods">\n			<ion-item class="height80 borderBottom" no-lines>\n                           <ion-row>\n                            <ion-col col-2>\n				<div  *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n                            </ion-col>\n                            <ion-col col-9>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                            <ion-col col-1>\n				 <ion-icon item-right ios="md-more" md="md-more"></ion-icon>\n                            </ion-col>\n                          </ion-row>\n			</ion-item>\n			<ion-item-options side="right">\n	      <button ion-button color="danger" (click)="delete(m.id)">\n	        <ion-icon ios="ios-trash" md="md-trash" ></ion-icon>\n	        Delete\n	      </button>\n				<button ion-button color="secondary" (click)="makeDefault(m.id)">\n				 <ion-icon ios="ios-add-circle" md="md-add-circle"></ion-icon>\n				 Make<br>Default\n			 </button>\n	    </ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/address/address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], AddressPage);

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CheckoutPage = (function () {
    function CheckoutPage(navCtrl, cdr, fb, alertCtrl, navParams, loadingCtrl, connect, zone) {
        this.navCtrl = navCtrl;
        this.cdr = cdr;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.connect = connect;
        this.zone = zone;
        this.user = '';
        this.address = '';
        this.username = '';
        this.shipping = '';
        this.payment = '';
        this.paycard = '';
        this.amode = 1;
        this.pmode = 1;
        this.allok = false;
        this.stripe_pub = '';
        this.FB_APP_ID = 1455239151263568;
        this.methods = [];
        this.amode = 1;
        this.pmode = 1;
        this.reg = {
            id: '',
            firstname: '',
            surname: '',
            phone: '',
            postcode: ''
        };
    }
    CheckoutPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    CheckoutPage.prototype.recalc = function () {
        var _this = this;
        this.user = window.localStorage.getItem('userTag');
        if (!this.user)
            this.user = '';
        if (!this.user.length) {
            window.localStorage.removeItem('userAddress');
            window.localStorage.removeItem('userPayment');
            window.localStorage.removeItem('userPostcode');
        }
        this.address = window.localStorage.getItem('userAddress');
        if (!this.address)
            this.address = '';
        this.payment = window.localStorage.getItem('userPayment');
        if (!this.payment)
            this.payment = '';
        if ((this.address.length) && (this.payment.length))
            this.allok = true;
        if (this.user.length) {
            var that_1 = this;
            var loader_1 = this.loadingCtrl.create({
                content: "Loading..."
            });
            loader_1.present();
            this.connect.getList('getuserdetails.php?amode=' + this.amode + '&pmode=' + this.pmode + '&user=' + this.user + '&address=' + this.address + '&payment=' + this.payment + '&cart=' + window.localStorage.getItem('cart')).subscribe(function (data) {
                that_1.zone.run(function () {
                    loader_1.dismiss();
                    that_1.user = data.user;
                    that_1.address = data.address;
                    that_1.username = data.username;
                    that_1.shipping = data.shipping;
                    that_1.methods = data.methods;
                    that_1.paycard = data.paycard;
                    that_1.pmethods = data.pmethods;
                    that_1.stripe_pub = data.stripe_pub;
                    that_1.payment = data.payment;
                    window.localStorage.setItem('userAddress', that_1.address);
                    window.localStorage.setItem('userPayment', that_1.payment);
                    window.localStorage.setItem('userPostcode', data.postcode);
                    if ((that_1.address.length) && (that_1.payment.length))
                        that_1.allok = true;
                    else
                        that_1.allok = false;
                    that_1.cdr.markForCheck();
                });
            }, function (err) {
                loader_1.dismiss();
                _this.connect.logError(err);
            });
        }
    };
    CheckoutPage.prototype.myAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Thank you',
            subTitle: msg,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    CheckoutPage.prototype.doLogout = function () {
        window.localStorage.removeItem('userTag');
        this.recalc();
    };
    CheckoutPage.prototype.loginUserWithFacebook = function () {
        var _this = this;
        var that = this;
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            var loader = _this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();
            var url = 'facebook.php?user=' + res.authResponse.userID + '&access=' + res.authResponse.accessToken;
            //   this.myAlert(url);
            _this.connect.getList(url).subscribe(function (data) {
                loader.dismiss();
                if ((data.firstname.length < 1) || (data.surname.length < 1) || (data.postcode.length < 1)) {
                    that.reg.id = data.user;
                    that.reg.email = data.email;
                    that.reg.firstname = data.firstname;
                    that.reg.surname = data.surname;
                    that.reg.phone = data.phone;
                    that.reg.postcode = data.postcode;
                    that.amode = 1;
                    that.pmode = 1;
                    that.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */], { reg: that.reg });
                }
                else {
                    window.localStorage.setItem('userTag', data.id);
                    that.recalc();
                }
            }, function (err) {
                loader.dismiss();
                _this.connect.logError(err);
            });
        })
            .catch(function (e) { return _this.myAlert('Error logging into Facebook' + JSON.stringify(e)); });
    };
    CheckoutPage.prototype.openSignUpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__email_login_email_login__["a" /* EmailLoginPage */]);
        this.amode = 1;
        this.pmode = 1;
    };
    CheckoutPage.prototype.showAddress = function (a) {
        window.localStorage.setItem('userAddress', a);
        this.amode = 0;
        this.pmode = 0;
        this.recalc();
    };
    CheckoutPage.prototype.showEnterAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__enter_address_enter_address__["a" /* EnterAddressPage */]);
    };
    CheckoutPage.prototype.showPayment = function (a) {
        window.localStorage.setItem('userPayment', a);
        this.pmode = 0;
        this.recalc();
    };
    CheckoutPage.prototype.showEnterPayment = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */], { stripe_pub: this.stripe_pub });
    };
    CheckoutPage.prototype.doConfirm = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var url = 'saveorder.php?user=' + window.localStorage.getItem('userTag') + '^' + this.address + '^' + this.payment + '&cart=' + window.localStorage.getItem('cart');
        //  this.myAlert(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            if (data.success)
                _this.orderComplete();
            else
                _this.myAlert('Your order could not be completed.  Please try again later');
        }, function (err) {
            loader.dismiss();
            _this.connect.logError(err);
        });
    };
    CheckoutPage.prototype.openTermsAndConditions = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__tandc_tandc__["a" /* TandcPage */]);
    };
    CheckoutPage.prototype.orderComplete = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Thank you',
            subTitle: 'Your order has been completed successfully',
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                        window.localStorage.removeItem('cart');
                        that.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-checkout',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/checkout/checkout.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Check-Out</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<div *ngIf="!user.length">\n <ion-item padding no-lines text-wrap>\n  <p>Having an account allows you to view & track your orders as well as saving your details for fast checkouts in future</p>\n  <ion-grid>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left class="facebook-btn" (click)="loginUserWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;Connect with Facebook</button>\n			</ion-col>\n		</ion-row>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left  (click)="openSignUpPage()"><ion-icon name="ios-mail"></ion-icon>&nbsp;&nbsp;Enter via email</button>\n			</ion-col>\n	          </ion-row>\n		<ion-row>\n			<ion-col padding class="error" *ngIf="error">\n				 <p>{{error}}</p>\n			 </ion-col>\n		 </ion-row>\n		<ion-row padding-top>\n			<ion-col>\n				<p class="fontSize10">By signing up, you agree to Tella\'s<br><a (click)="openTermsAndConditions()">Terms and Conditions</a></p>\n			</ion-col>\n		</ion-row>\n  </ion-grid>\n </ion-item>\n</div>\n<div *ngIf="user.length">\n <div>Checkout as :-</div>\n <p class="userdetails" [innerHTML]="username"> </p>\n <ion-item text-right no-lines>\n  <button ion-button small outline (click)="doLogout()">Change</button>\n </ion-item> \n <div *ngIf="address.length" style="border-top:1px solid gainsboro">\n  <div>Shipping Address :-</div>\n  <p class="userdetails" [innerHTML]="shipping"> </p>\n  <ion-item text-right no-lines>\n   <button ion-button small outline (click)="showAddress(\'\')">Change</button>\n  </ion-item> \n\n  <div *ngIf="payment.length"  style="border-top:1px solid gainsboro">\n   <div>Payment Method :-</div>\n   <p class="userdetails" [innerHTML]="paycard"> </p>\n   <ion-item text-right no-lines>\n    <button ion-button small outline (click)="showPayment(\'\')">Change</button>\n   </ion-item> \n  </div>\n  <div *ngIf="!payment.length"  style="border-top:1px solid gainsboro"> \n   <div>Choose Payment Method :-</div>\n    <ion-list class="noBottomMargin">\n     <ion-item class="height80 borderBottom" no-lines  *ngFor="let m of pmethods">\n       <div (click)="showPayment(m.id);">\n       <ion-row>\n       <ion-col col-1>\n       </ion-col>\n       <ion-col col-11>\n       <div>\n	{{ m.typ }} ending in **** {{ m.last4 }}\n       </div>\n       </ion-col>\n       </ion-row>\n       </div>\n     </ion-item>\n    </ion-list>\n\n    <button ion-item (click)="showEnterPayment()" class="height80 borderBottom" no-lines>\n		Add Payment Method\n    </button>\n   </div>\n </div> \n <div *ngIf="!address.length"  style="border-top:1px solid gainsboro"> \n <div>Choose Shipping Address :-</div>\n\n	<ion-list class="noBottomMargin">\n			<ion-item class="height80 borderBottom" no-lines  *ngFor="let m of methods">\n                         <div (click)="showAddress(m.id);">\n                           <ion-row>\n                            <ion-col col-1>\n                            </ion-col>\n                            <ion-col col-11>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                          </ion-row>\n                        </div>\n		</ion-item>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n\n </div>\n</div> \n</ion-content>\n<ion-footer *ngIf="allok">\n<button ion-button full (click)="doConfirm()" color="secondary">CONFIRM</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/checkout/checkout.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PaymentsPage = (function () {
    function PaymentsPage(navCtrl, navParams, platform, connect, view, zone, cdr, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.connect = connect;
        this.view = view;
        this.zone = zone;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
        this.stripe_pub = '';
    }
    PaymentsPage.prototype.delete = function (id, cardid) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.connect.getList('deletecc.php?id=' + id + "&cardid=" + cardid + '&tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                loader.dismiss();
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    PaymentsPage.prototype.loadCards = function () {
        var _this = this;
        var that = this;
        this.connect.getList('getcards.php?tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                console.log(data);
                that.methods = data.methods;
                that.stripe_pub = data.stripe_pub;
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    PaymentsPage.prototype.makeDefault = function (id, cardid) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.connect.getList('setdefaultcard.php?id=' + id + "&cardid=" + cardid + '&tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                loader.dismiss();
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    PaymentsPage.prototype.ionViewDidEnter = function () {
        this.loadCards();
    };
    PaymentsPage.prototype.showEnterCreditCard = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */], { stripe_pub: this.stripe_pub });
    };
    PaymentsPage.prototype.closeme = function () {
        this.navCtrl.pop();
    };
    PaymentsPage.prototype.returnToMain = function () {
        this.navCtrl.pop();
    };
    return PaymentsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('navbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Navbar */])
], PaymentsPage.prototype, "navBar", void 0);
PaymentsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payments',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/payments/payments.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Payment Methods</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n		<ion-item-sliding *ngFor="let m of methods">\n			<ion-item class="height80 borderBottom" no-lines>\n				<div style="float:left" *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n				{{ m.typ }} ending in **** {{ m.last4 }}\n				 <ion-icon item-right ios="md-more" md="md-more"></ion-icon>\n			</ion-item>\n			<ion-item-options side="right">\n	      <button ion-button color="danger" (click)="delete(m.id, m.cardid)">\n	        <ion-icon ios="ios-trash" md="md-trash" ></ion-icon>\n	        Delete\n	      </button>\n				<button ion-button color="secondary" (click)="makeDefault(m.id, m.cardid)">\n				 <ion-icon ios="ios-add-circle" md="md-add-circle"></ion-icon>\n				 Make<br>Default\n			 </button>\n	    </ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterCreditCard()" class="height80 borderBottom" no-lines>\n		Add Payment Method\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/payments/payments.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], PaymentsPage);

//# sourceMappingURL=payments.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ShippingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ShippingPage = (function () {
    function ShippingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ShippingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ShippingPage');
    };
    return ShippingPage;
}());
ShippingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-shipping',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/shipping/shipping.html"*/'<!--\n  Generated template for the ShippingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>shipping</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/shipping/shipping.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], ShippingPage);

//# sourceMappingURL=shipping.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		288,
		12
	],
	"../pages/address/address.module": [
		290,
		11
	],
	"../pages/checkout/checkout.module": [
		295,
		10
	],
	"../pages/choose-address/choose-address.module": [
		298,
		9
	],
	"../pages/email-login/email-login.module": [
		293,
		8
	],
	"../pages/enter-address/enter-address.module": [
		289,
		7
	],
	"../pages/enter-credit-card/enter-credit-card.module": [
		294,
		6
	],
	"../pages/multiple/multiple.module": [
		287,
		5
	],
	"../pages/oneitem/oneitem.module": [
		286,
		4
	],
	"../pages/payments/payments.module": [
		296,
		3
	],
	"../pages/register/register.module": [
		292,
		2
	],
	"../pages/shipping/shipping.module": [
		297,
		1
	],
	"../pages/tandc/tandc.module": [
		291,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 165;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tandc2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Tandc2Page = (function () {
    function Tandc2Page(navCtrl, navParams, zone, cdr, connect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.cdr = cdr;
        this.connect = connect;
        this.qns = [];
        this.shownGroup = null;
        this.page = this.navParams.get("page");
        this.heading = this.navParams.get("heading");
    }
    Tandc2Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        var url = 'gettandc.php?page=' + this.page;
        this.connect.getList(url).subscribe(function (data) {
            that.zone.run(function () {
                that.qns = data;
                that.cdr.markForCheck();
            });
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    Tandc2Page.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    Tandc2Page.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    return Tandc2Page;
}());
Tandc2Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tandc2',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/tandc2/tandc2.html"*/'<!--\n  Generated template for the Tandc2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ heading }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n<ion-list>\n <ion-item *ngFor="let q of qns; let i=index" text-wrap (click)="toggleGroup(i)" [ngClass]="{active: isGroupShown(i)}">\n   <h3 style="font-weight:bold">{{ q.qn }}\n    <ion-icon color="success" item-right [name]="isGroupShown(i) ? \'arrow-dropdown\' : \'arrow-dropright\'"></ion-icon>\n   </h3>\n   <div *ngIf="isGroupShown(i)" [innerHtml]="q.ans">\n   </div>\n </ion-item>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/tandc2/tandc2.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */]])
], Tandc2Page);

//# sourceMappingURL=tandc2.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__histitems_histitems__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HistoryPage = (function () {
    function HistoryPage(navCtrl, navParams, zone, cdr, connect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.cdr = cdr;
        this.connect = connect;
        this.usr = 0;
        this.hist = [];
        this.usr = window.localStorage.getItem('userTag');
    }
    HistoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.hist = [];
        if (this.usr)
            if (parseInt(this.usr) > 0) {
                var that_1 = this;
                var url = 'gethist.php?user=' + this.usr;
                this.connect.getList(url).subscribe(function (data) {
                    that_1.zone.run(function () {
                        that_1.hist = data;
                        that_1.cdr.markForCheck();
                    });
                }, function (err) {
                    _this.connect.logError(err);
                });
            }
    };
    HistoryPage.prototype.gotoTrans = function (h) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__histitems_histitems__["a" /* HistitemsPage */], { order: h.id });
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/history/history.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Order History</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div *ngIf="!hist.length">\n<ion-item text-wrap>\n<h2>You have not made any Orders</h2>\n</ion-item>\n<ion-item text-wrap>\n<h2>When you place orders with the Tella App they will appear here</h2>\n</ion-item>\n</div>\n<div *ngIf="hist.length">\n<ion-list>\n <ion-item *ngFor="let h of hist" (click)="gotoTrans(h)">\n   <h1>{{ h.company }}</h1>\n   <div>\n   <div style="float:right"><h3><i>{{ h.date }} </i> </h3> </div>\n   <h2>${{ h.amount }}</h2>\n   <h3 style="color:red">{{ h.tracking }}</h3>\n   </div>\n </ion-item>\n</ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/history/history.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistitemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_main__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HistitemsPage = (function () {
    function HistitemsPage(nav, navParams, view, connect, zone, alertCtrl, cdr) {
        this.nav = nav;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.anychosen = false;
        this.items = [];
        this.order = 0;
        this.bannerImg = './assets/img/blankbanner.jpg';
        this.items = [];
        this.order = this.navParams.get("order");
        window.localStorage.removeItem('toadd');
    }
    HistitemsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        var url = 'gettrans.php?id=' + this.order;
        this.connect.getList(url).subscribe(function (data) {
            that.zone.run(function () {
                that.items = data.items;
                for (var ss in _this.items)
                    _this.bannerImg = 'http://theparcelpeople.com.au/catalogue/banners/' + _this.items[ss].company + '.jpg';
                that.cdr.markForCheck();
            });
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    HistitemsPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    HistitemsPage.prototype.recalc = function () {
        var c = window.localStorage.getItem('toadd');
        if (!c)
            c = '';
        this.anychosen = false;
        if (c.length)
            for (var ss in this.items) {
                if (this.items[ss].id == c)
                    this.items[ss].added = 1;
                if (this.items[ss].added == 1)
                    this.anychosen = true;
            }
        console.log('any=' + this.anychosen);
    };
    HistitemsPage.prototype.AddToCart = function () {
        var c = window.localStorage.getItem('cart');
        if (!c)
            c = '';
        for (var ss in this.items)
            if (this.items[ss].added > 0)
                c = "" + this.items[ss].id + "^1^" + this.items[ss].price + "^" + this.items[ss].title + "^" + this.items[ss].company + (c.length ? '~' : '') + c;
        window.localStorage.setItem('cart', c);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__main_main__["a" /* MainPage */]);
    };
    HistitemsPage.prototype.selectProduct = function (pos) {
        for (var ss in this.items)
            if (this.items[ss].pos == pos)
                this.items[ss].added = 1;
        this.anychosen = true;
    };
    HistitemsPage.prototype.unselectProduct = function (pos) {
        this.anychosen = false;
        for (var ss in this.items) {
            if (this.items[ss].pos == pos)
                this.items[ss].added = 0;
            if (this.items[ss].added == 1)
                this.anychosen = true;
        }
    };
    HistitemsPage.prototype.goProduct = function (item) {
        window.localStorage.removeItem('toadd');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: item, buttonmode: (item.added == 0 ? 'REORDER' : '') });
    };
    HistitemsPage.prototype.closeme = function () {
        this.nav.pop();
    };
    return HistitemsPage;
}());
HistitemsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-histitems',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/histitems/histitems.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Order Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerImg" style="width:90%">\n</ion-col>\n</ion-row>\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of items" class="borderBottomGainsboroAlpha">\n				\n<ion-grid>\n<ion-row>\n<ion-col col-4>\n 					<img [src]="et.pic" (click)="goProduct(et);">\n</ion-col><ion-col col-8>\n					<h1 class="textDodger fontSize10" (click)="goProduct(et);">{{ et.title }}</h1>\n<p class="price">${{ et.origprice }} &nbsp; (X{{ et.origqty }})</p>\n<div *ngIf="et.added==0">\n <div *ngIf="et.qty>0">\n   <button ion-button small color="secondary" (click)="selectProduct(et.pos);" outline>ReOrder</button>\n </div>\n <div *ngIf="et.qty<1">\n   <button ion-button small color="danger">Sold Out</button>\n </div>\n</div>\n<div *ngIf="et.added>0">\n <button ion-button small color="secondary" (click)="unselectProduct(et.pos);" >Selected</button>\n</div>\n <div *ngIf="et.added<0">\n   <button ion-button small color="primary">Already In Cart</button>\n </div>\n\n</ion-col>\n</ion-row>\n</ion-grid>\n				\n			</ion-item>\n		</ion-list>\n</ion-content>\n<ion-footer  *ngIf="anychosen">\n<button ion-button full (click)="AddToCart()" color="secondary">ADD TO CART</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/histitems/histitems.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], HistitemsPage);

//# sourceMappingURL=histitems.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MapPage = (function () {
    function MapPage(navCtrl, navParams, http, connect, geolocation, zone, cdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.connect = connect;
        this.geolocation = geolocation;
        this.zone = zone;
        this.cdr = cdr;
        this.lat = '';
        this.lng = '';
        this.markers = [];
        this.dinfo = [];
    }
    MapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.latitude = '-31.942957';
        this.longitude = '115.827994';
        this.geolocation.getCurrentPosition().then(function (resp) {
            if (resp.coords != undefined) {
                _this.latitude = resp.coords.latitude;
                _this.longitude = resp.coords.longitude;
            }
            _this.loadMap();
        }).catch(function (error) {
            _this.loadMap();
        });
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var location = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));
        var mapOptions = {
            center: location,
            zoom: 15,
            //      disableDefaultUI: true, //https://developers.google.com/maps/documentation/javascript/controls//
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.infowindow = new google.maps.InfoWindow({
            content: 'nothing yet'
        });
        var that = this;
        var url = 'getdeals.php';
        var cnt = 0;
        var img = 'http://jaydenkur.com.au/aserv/icon2.png';
        this.connect.getList2(url).subscribe(function (data) {
            that.zone.run(function () {
                for (var d in data) {
                    var mk = new google.maps.LatLng(parseFloat(data[d].lat), parseFloat(data[d].lng));
                    that.markers.push(new google.maps.Marker({
                        position: mk,
                        draggable: false,
                        //         animation: google.maps.Animation.DROP,
                        //         icon: img,
                        map: _this.map,
                        title: data[d].name
                    }));
                    that.dinfo.push('<div><b>' + data[d].name + '</b></div>' + data[d].address + '<br><i><b>' + data[d].deal + '</i></b>');
                    google.maps.event.addListener(that.markers[cnt], 'mouseover', function () {
                        var num = that.markers.indexOf(this);
                        that.infowindow.setContent(that.dinfo[num]);
                        that.infowindow.setPosition(that.markers[num].position);
                        that.infowindow.open(that.map);
                    });
                    google.maps.event.addListener(that.markers[cnt], 'mouseout', function () {
                        that.infowindow.close();
                    });
                    cnt++;
                }
            });
            console.log('count=' + cnt);
            console.log(that.markers);
            that.cdr.markForCheck();
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    return MapPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], MapPage.prototype, "mapElement", void 0);
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/map/map.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Local Offers</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div #map id="map" style="width:100%; height:100%">\n</div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/map/map.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyaccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyaccountPage = (function () {
    function MyaccountPage(navCtrl, cdr, fb, alertCtrl, navParams, loadingCtrl, connect, zone) {
        this.navCtrl = navCtrl;
        this.cdr = cdr;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.connect = connect;
        this.zone = zone;
        this.user = '';
        this.address = '';
        this.username = '';
        this.FB_APP_ID = 1455239151263568;
        this.reg = {
            id: '',
            email: '',
            firstname: '',
            surname: '',
            phone: '',
            postcode: ''
        };
    }
    MyaccountPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    MyaccountPage.prototype.recalc = function () {
        var _this = this;
        this.user = window.localStorage.getItem('userTag');
        if (!this.user)
            this.user = '';
        if (this.user.length) {
            var that_1 = this;
            var loader_1 = this.loadingCtrl.create({
                content: "Loading..."
            });
            loader_1.present();
            this.connect.getList('getaccountdetails.php?user=' + this.user).subscribe(function (data) {
                that_1.zone.run(function () {
                    loader_1.dismiss();
                    that_1.user = data.user;
                    that_1.reg = data.reg;
                    that_1.cdr.markForCheck();
                });
            }, function (err) {
                loader_1.dismiss();
                _this.connect.logError(err);
            });
        }
    };
    MyaccountPage.prototype.myAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Thank you',
            subTitle: msg,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    MyaccountPage.prototype.doLogout = function () {
        window.localStorage.removeItem('userTag');
        this.recalc();
    };
    MyaccountPage.prototype.loginUserWithFacebook = function () {
        var _this = this;
        var that = this;
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            var loader = _this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader.present();
            var url = 'facebook.php?user=' + res.authResponse.userID + '&access=' + res.authResponse.accessToken;
            //   this.myAlert(url);
            _this.connect.getList(url).subscribe(function (data) {
                loader.dismiss();
                if ((data.firstname.length < 1) || (data.surname.length < 1) || (data.postcode.length < 1)) {
                    that.reg.id = data.user;
                    that.reg.email = data.email;
                    that.reg.firstname = data.firstname;
                    that.reg.surname = data.surname;
                    that.reg.phone = data.phone;
                    that.reg.postcode = data.postcode;
                    that.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__register_register__["a" /* RegisterPage */], { reg: that.reg });
                }
                else {
                    window.localStorage.setItem('userTag', data.id);
                    that.recalc();
                }
            }, function (err) {
                loader.dismiss();
                _this.connect.logError(err);
            });
        })
            .catch(function (e) { return _this.myAlert('Error logging into Facebook' + JSON.stringify(e)); });
    };
    MyaccountPage.prototype.openSignUpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__email_login_email_login__["a" /* EmailLoginPage */]);
    };
    MyaccountPage.prototype.openTermsAndConditions = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__tandc_tandc__["a" /* TandcPage */]);
    };
    return MyaccountPage;
}());
MyaccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-myaccount',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/myaccount/myaccount.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<div *ngIf="!user.length">\n <ion-item padding no-lines text-wrap>\n  <p>Having an account allows you to view & track your orders as well as saving your details for fast checkouts in future</p>\n  <ion-grid>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left class="facebook-btn" (click)="loginUserWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;Connect with Facebook</button>\n			</ion-col>\n		</ion-row>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left  (click)="openSignUpPage()"><ion-icon name="ios-mail"></ion-icon>&nbsp;&nbsp;Enter via email</button>\n			</ion-col>\n	          </ion-row>\n		<ion-row>\n			<ion-col padding class="error" *ngIf="error">\n				 <p>{{error}}</p>\n			 </ion-col>\n		 </ion-row>\n		<ion-row padding-top>\n			<ion-col>\n				<p class="fontSize10">By signing up, you agree to Tella\'s<br><a (click)="openTermsAndConditions()">Terms and Conditions</a></p>\n			</ion-col>\n		</ion-row>\n  </ion-grid>\n </ion-item>\n</div>\n<div *ngIf="user.length">\n\n		<ion-grid no-padding>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>First Name</ion-label>\n						<ion-input type="text" [(ngModel)]="reg.firstname"></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Last Name</ion-label>\n						<ion-input type="text" [(ngModel)]="reg.surname"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Phone Number</ion-label>\n						<ion-input type="tel" [(ngModel)]="reg.phone"  ></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Email</ion-label>\n						<ion-input type="email" [(ngModel)]="reg.email"  ></ion-input>\n\n					</ion-item>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n</div> \n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/myaccount/myaccount.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], MyaccountPage);

//# sourceMappingURL=myaccount.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shipping_shipping__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChooseAddressPage = (function () {
    function ChooseAddressPage(navCtrl, navParams, platform, connect, view, zone, cdr, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.connect = connect;
        this.view = view;
        this.zone = zone;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
        this.methods = [];
    }
    ChooseAddressPage.prototype.loadAddress = function () {
        var _this = this;
        var that = this;
        this.connect.getList('getaddress.php?tag=' + window.localStorage.getItem('userTag')).subscribe(function (data) {
            that.zone.run(function () {
                console.log(data);
                that.methods = data.methods;
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    ChooseAddressPage.prototype.ionViewDidEnter = function () {
        this.loadAddress();
    };
    ChooseAddressPage.prototype.showEnterAddress = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__["a" /* EnterAddressPage */]);
    };
    ChooseAddressPage.prototype.closeme = function () {
        this.navCtrl.pop();
    };
    ChooseAddressPage.prototype.returnToMain = function () {
        this.navCtrl.pop();
    };
    ChooseAddressPage.prototype.showShipping = function (m) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shipping_shipping__["a" /* ShippingPage */], { addressid: m.id });
    };
    return ChooseAddressPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('navbar'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Navbar */])
], ChooseAddressPage.prototype, "navBar", void 0);
ChooseAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-choose-address',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/choose-address/choose-address.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Shipping Address</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n			<ion-item class="height80 borderBottom" no-lines  *ngFor="let m of methods">\n                         <button ion-button (click)="showShipping(m);">\n                           <ion-row>\n                            <ion-col col-2>\n				<div  *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n                            </ion-col>\n                            <ion-col col-10>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                          </ion-row>\n                        </button>\n		</ion-item>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/choose-address/choose-address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ChooseAddressPage);

//# sourceMappingURL=choose-address.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(237);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_20" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_checkout_checkout__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_main_main__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_account_account__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_address_address__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_history_history__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tandc2_tandc2__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_histitems_histitems__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_map_map__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_oneitem_oneitem__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_multiple_multiple__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_payments_payments__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_myaccount_myaccount__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_choose_address_choose_address__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_shipping_shipping__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_stripe__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_geolocation__ = __webpack_require__(215);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_main_main__["a" /* MainPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_oneitem_oneitem__["a" /* OneitemPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_multiple_multiple__["a" /* MultiplePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_tandc_tandc__["a" /* TandcPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tandc2_tandc2__["a" /* Tandc2Page */],
            __WEBPACK_IMPORTED_MODULE_9__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_myaccount_myaccount__["a" /* MyaccountPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_histitems_histitems__["a" /* HistitemsPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_payments_payments__["a" /* PaymentsPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_shipping_shipping__["a" /* ShippingPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_choose_address_choose_address__["a" /* ChooseAddressPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_enter_address_enter_address__["a" /* EnterAddressPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_email_login_email_login__["a" /* EmailLoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/oneitem/oneitem.module#OneitemPageModule', name: 'OneitemPage', segment: 'oneitem', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/multiple/multiple.module#MultiplePageModule', name: 'MultiplePage', segment: 'multiple', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/enter-address/enter-address.module#EnterAddressPageModule', name: 'EnterAddressPage', segment: 'enter-address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/address/address.module#AddressPageModule', name: 'AddressPage', segment: 'address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tandc/tandc.module#TandcPageModule', name: 'TandcPage', segment: 'tandc', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/email-login/email-login.module#EmailLoginPageModule', name: 'EmailLoginPage', segment: 'email-login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/enter-credit-card/enter-credit-card.module#EnterCreditCardPageModule', name: 'EnterCreditCardPage', segment: 'enter-credit-card', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/checkout/checkout.module#CheckoutPageModule', name: 'CheckoutPage', segment: 'checkout', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/payments/payments.module#PaymentsPageModule', name: 'PaymentsPage', segment: 'payments', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/shipping/shipping.module#ShippingPageModule', name: 'ShippingPage', segment: 'shipping', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/choose-address/choose-address.module#ChooseAddressPageModule', name: 'ChooseAddressPage', segment: 'choose-address', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_main_main__["a" /* MainPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_oneitem_oneitem__["a" /* OneitemPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_multiple_multiple__["a" /* MultiplePage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_payments_payments__["a" /* PaymentsPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_histitems_histitems__["a" /* HistitemsPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_tandc_tandc__["a" /* TandcPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tandc2_tandc2__["a" /* Tandc2Page */],
            __WEBPACK_IMPORTED_MODULE_12__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_myaccount_myaccount__["a" /* MyaccountPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_enter_address_enter_address__["a" /* EnterAddressPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_shipping_shipping__["a" /* ShippingPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_choose_address_choose_address__["a" /* ChooseAddressPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_email_login_email_login__["a" /* EmailLoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_29__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_28__providers_connect__["a" /* Connect */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_main_main__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_main_main__["a" /* MainPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(false);
            statusBar.show();
            splashScreen.hide();
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_main_main__["a" /* MainPage */];
        });
    }
    MyApp.prototype.ngOnInit = function () {
        window.localStorage.removeItem('freightValid');
    };
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/var/www/html/ionic/login/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OneitemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OneitemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OneitemPage = (function () {
    function OneitemPage(navCtrl, navParams, view, connect, zone, cdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.cdr = cdr;
        this.myPic = './assets/img/blank.jpg';
        this.bannerPic = './assets/img/blankbanner.jpg';
        this.item = { id: 0, title: '', pic: '', price: '' };
        this.title = '';
        this.price = '';
        this.qty = 0;
        this.details = '';
        this.buttonmode = 'Select';
        this.item = this.navParams.get('item');
        this.buttonmode = this.navParams.get('buttonmode');
        this.details = 'Lorem emptor ...';
        this.title = this.item.title;
        this.myPic = this.item.pic;
        this.bannerPic = 'http://theparcelpeople.com.au/catalogue/banners/' + this.item.company + '.jpg?v=2';
        this.qty = this.item.qty;
        this.price = this.item.price;
    }
    OneitemPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        this.connect.getList('itemdetails.php?id=' + this.item.id).subscribe(function (data) {
            that.zone.run(function () {
                that.details = data.details;
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    OneitemPage.prototype.closeme = function () {
        this.view.dismiss();
    };
    OneitemPage.prototype.addProduct = function () {
        if (this.buttonmode == 'SELECT') {
            window.localStorage.setItem('toadd', this.item.id);
            console.log('adding ' + this.item.id);
        }
        else {
            var c = window.localStorage.getItem('cart');
            var nw = [];
            var found = false;
            if (c.length) {
                var i = c.split('~');
                for (var e = 0; e < i.length; e++) {
                    var t = i[e].split('^');
                    if (t[0] == this.item.id) {
                        var tt = parseInt(t[1]) + 1;
                        t[1] = tt.toString();
                        found = true;
                    }
                    nw.push(t.join('^'));
                }
            }
            if (!found)
                nw.unshift("" + this.item.id + "^1^" + this.item.price + "^" + this.item.title + '^' + this.item.company);
            c = nw.join('~');
            window.localStorage.setItem('cart', c);
        }
        this.closeme();
    };
    return OneitemPage;
}());
OneitemPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-oneitem',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/oneitem/oneitem.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content no-padding>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerPic" style="width:100%">\n</ion-col>\n</ion-row>\n\n<ion-row text-center>\n<ion-col col-2>\n</ion-col>\n<ion-col col-8>\n<img [src]="myPic" style = "border:1px solid gainsboro">\n</ion-col>\n<ion-col col-2>\n</ion-col>\n</ion-row>\n<ion-item padding text-wrap no-lines>\n<div style="font-weight:bold">{{ title }}</div>\n<div style="font-weight:bold; margin-top:0px !important">${{ price }}</div>\n<p style="margin-top:15px" [innerHTML]="details"></p>\n</ion-item>\n</ion-content>\n<ion-footer *ngIf="buttonmode.length">\n<button ion-button block color="secondary" (click)="addProduct()">{{ buttonmode }}</button>\n</ion-footer>\n\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/oneitem/oneitem.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], OneitemPage);

//# sourceMappingURL=oneitem.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EnterAddressPage = (function () {
    function EnterAddressPage(navCtrl, navParams, view, connect, zone, cdr, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.donealready = false;
        this.mprofile = [];
        this.mprofile = { add1: '', add2: '', suburb: '', state: '', postcode: '', country: 'Australia', 'dflt': false };
    }
    EnterAddressPage.prototype.getToken = function () {
        var _this = this;
        if (!this.donealready) {
            this.donealready = true;
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            var that_1 = this;
            this.connect.getList('newadd.php?tag=' + window.localStorage.getItem('userTag') + '&add=' + JSON.stringify(this.mprofile)).subscribe(function (data) {
                that_1.zone.run(function () {
                    setTimeout(function () {
                        loader_1.dismiss();
                        that_1.navCtrl.pop();
                    }, 200);
                    that_1.cdr.markForCheck();
                });
            }, function (err) {
                _this.connect.logError(err);
                that_1.zone.run(function () {
                    setTimeout(function () {
                        loader_1.dismiss();
                        that_1.navCtrl.pop();
                    }, 200);
                    that_1.cdr.markForCheck();
                });
            });
        }
    };
    EnterAddressPage.prototype.ionViewDidLoad = function () {
    };
    EnterAddressPage.prototype.closeme = function () {
        this.navCtrl.pop();
    };
    EnterAddressPage.prototype.showAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'error',
            subTitle: msg,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    return EnterAddressPage;
}());
EnterAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-enter-address',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/enter-address/enter-address.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>New Address</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-scroll>\n	<div  class="maxWidth480">\n		<ion-grid no-padding>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Address Line 1</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.add1"></ion-input>\n					</ion-item>\n				</ion-col>\n                        </ion-row>\n		        <ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Address Line 2</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.add2"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Suburb</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.suburb"  ></ion-input>\n					</ion-item>\n				</ion-col>\n                         </ion-row>\n			 <ion-row>\n				<ion-col col-8>\n					<ion-item>\n						<ion-label stacked>State</ion-label>\n						<ion-input type="text" [(ngModel)]="mprofile.state"  ></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col col-4>\n					<ion-item>\n						<ion-label stacked>PostCode</ion-label>\n						<ion-input type="tel" [(ngModel)]="mprofile.postcode"  ></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Country</ion-label>\n						<ion-input type="country" [(ngModel)]="mprofile.country" ></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n \n	</div>\n</ion-content>\n<ion-footer>\n              <button ion-button full (click)="getToken()" color="secondary">SUBMIT</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/enter-address/enter-address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], EnterAddressPage);

//# sourceMappingURL=enter-address.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TandcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tandc2_tandc2__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TandcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TandcPage = (function () {
    function TandcPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.hlist = [];
    }
    TandcPage.prototype.ionViewDidLoad = function () {
        var h = ['Payments & Disputes', 'Deliveries & Queries', 'Returns Policy', 'Privacy Policy', 'General Terms & Conditions'];
        var cnt = 0;
        for (var i in h) {
            var ar = { 'num': cnt++, 'name': h[i] };
            this.hlist.push(ar);
        }
    };
    TandcPage.prototype.goPage = function (a) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tandc2_tandc2__["a" /* Tandc2Page */], { 'page': a.num, 'heading': a.name });
    };
    return TandcPage;
}());
TandcPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tandc',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/tandc/tandc.html"*/'<!--\n  Generated template for the TandcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Terms & Conditions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list>\n <button ion-item *ngFor="let h of hlist" (click)="goPage(h)">\n   {{ h.name }}\n </button>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/tandc/tandc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], TandcPage);

//# sourceMappingURL=tandc.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EmailLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(loadingCtrl, navCtrl, toastCtrl, connect, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.connect = connect;
        this.navParams = navParams;
        this.reg = this.navParams.get('reg');
    }
    RegisterPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        //    console.log('ionViewDidLoad EmailLoginPage');
    };
    RegisterPage.prototype.doRegister = function () {
        var msg = '';
        if (this.reg.postcode.length < 3)
            msg = 'Please enter your postcode to optimize your shipping costs.';
        if ((this.reg.firstname.length < 1) || (this.reg.surname.length < 1))
            msg = 'Please enter your name so orders can be addressed to you';
        if (msg.length)
            this.presentToast(msg);
        else {
            var that_1 = this;
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            var url = 'userregister.php?reg=' + JSON.stringify(this.reg);
            this.connect.getList(url).subscribe(function (data) {
                loading_1.dismiss();
                if (data.success) {
                    window.localStorage.setItem('userTag', that_1.reg.id);
                    that_1.navCtrl.pop();
                }
            }, function (err) {
                loading_1.dismiss();
                that_1.connect.logError(err);
            });
        }
    };
    RegisterPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/register/register.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title text-center>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content text-center>\n <ion-grid>\n <ion-row>\n   <ion-col>\n<p>Welcome to Tella.  Please fill out the details below to establish your account.</p>\n </ion-col>\n</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Register with Email</ion-label>\n							<ion-input type="email" [(ngModel)]="reg.email" disabled></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>First Name</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.firstname" required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Surname</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.surname" required></ion-input>\n						</ion-item>\n\n						<ion-item>\n							<ion-label color="primary" floating>Phone Number</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.phone" required></ion-input>\n						</ion-item>\n\n						<ion-item>\n							<ion-label color="primary" floating>Postcode</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.postcode" required></ion-input>\n						</ion-item>\n\n					</ion-list>\n				</ion-col>\n			</ion-row>\n </ion-grid>  \n</ion-content>\n<ion-footer>\n<button ion-button full color="secondary" (click)="doRegister()">Register</button>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the EmailLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EmailLoginPage = (function () {
    function EmailLoginPage(loadingCtrl, navCtrl, toastCtrl, connect, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.connect = connect;
        this.navParams = navParams;
        this.newmode = '0';
        this.newmode = '0';
        this.form = {
            email: '',
            password: ''
        };
        this.reg = {
            id: '',
            firstname: '',
            surname: '',
            phone: '',
            postcode: ''
        };
    }
    EmailLoginPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    EmailLoginPage.prototype.ionViewDidEnter = function () {
        if (window.localStorage.getItem('userTag'))
            this.navCtrl.pop();
    };
    EmailLoginPage.prototype.login = function () {
        var msg = '';
        if (this.form.password.length < 6)
            msg = 'Password Too Short';
        var a1 = this.form.email.indexOf('@');
        if (a1 > 0) {
            var m = this.form.email.substr(a1);
            if (m.indexOf('.') <= 0)
                msg = 'Invalid Email Address';
        }
        else
            msg = 'Invalid Email Address';
        if (msg.length)
            this.presentToast(msg);
        else
            this.dologin();
    };
    EmailLoginPage.prototype.dologin = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var that = this;
        this.connect.getList('userlogin.php?params=' + encodeURI(this.form.email + '^' + this.form.password)).subscribe(function (data) {
            loading.dismiss();
            if (data.success > '0') {
                if ((data.firstname.length > 0) && (data.surname.length > 0)) {
                    window.localStorage.setItem('userTag', data.userTag);
                    that.navCtrl.pop();
                }
                else {
                    that.reg.id = data.userTag;
                    that.newmode = '1';
                    that.reg.email = data.email;
                    that.reg.firstname = data.firstname;
                    that.reg.surname = data.surname;
                    that.reg.phone = data.phone;
                    that.reg.postcode = data.postcode;
                    that.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */], { reg: that.reg });
                }
            }
            else {
                that.error = data.error;
            }
        }, function (err) { return _this.connect.logError(err); });
    };
    return EmailLoginPage;
}());
EmailLoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-email-login',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/email-login/email-login.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title text-center>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content text-center>\n	<ion-grid>\n		\n		<form (ngSubmit)="login()" #loginForm="ngForm" class="maxWidth300">\n			<ion-row>\n				<ion-col>\n					<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Log in with Email</ion-label>\n							<ion-input type="email" [(ngModel)]="form.email" name="email" clearInput="true" required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Password</ion-label>\n							<ion-input type="password"[(ngModel)]="form.password" name="password" clearInput="true" required></ion-input>\n						</ion-item>\n					</ion-list>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<button ion-button full [disabled]="!loginForm.form.valid" class="button200">Log In / Sign Up</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col padding class="error" *ngIf="error">\n					<p>{{error}}</p>\n				</ion-col>\n			</ion-row>\n		</form>\n		<ion-row padding-top>\n			<ion-col text-center>\n				<a (click)="openForgotPasswordPage()">Forgot Password?</a>\n			</ion-col>\n		</ion-row>\n	\n		<div class="spacer height80"></div>\n </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/email-login/email-login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], EmailLoginPage);

//# sourceMappingURL=email-login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterCreditCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



 //https://ionicframework.com/docs/native/stripe/
var EnterCreditCardPage = (function () {
    function EnterCreditCardPage(navCtrl, navParams, view, connect, zone, stripe, cdr, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.stripe = stripe;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.cardNumber = "";
        this.cardExpiryMon = "";
        this.cardExpiryYr = "";
        this.cardCvc = "";
        this.errMessage = "";
        this.makeDefault = false;
        this.donealready = false;
        this.stripe_pub = '';
        this.stripe_pub = this.navParams.get('stripe_pub');
        this.stripe.setPublishableKey(this.stripe_pub);
    }
    EnterCreditCardPage.prototype.getToken = function () {
        var _this = this;
        if (!this.donealready) {
            this.donealready = true;
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            if (this.cardExpiryMon.length < 2)
                this.cardExpiryMon = '0' + this.cardExpiryMon;
            var card = {
                number: this.cardNumber,
                expMonth: this.cardExpiryMon.substr(0, 2),
                expYear: 20 + this.cardExpiryYr.substr(0, 2),
                cvc: this.cardCvc
            };
            var def;
            if (this.makeDefault) {
                def = 1;
            }
            else {
                def = 0;
            }
            var that_1 = this;
            this.stripe.createCardToken(card)
                .then(function (token) {
                _this.connect.getList('newcc.php?tag=' + window.localStorage.getItem('userTag') + '&token=' + JSON.stringify(token) + '&dflt=' + def).subscribe(function (data) {
                    that_1.zone.run(function () {
                        setTimeout(function () {
                            loader_1.dismiss();
                            that_1.view.dismiss();
                        }, 200);
                        that_1.cdr.markForCheck();
                    });
                }, function (err) {
                    _this.connect.logError(err);
                    that_1.zone.run(function () {
                        setTimeout(function () {
                            loader_1.dismiss();
                            that_1.view.dismiss();
                        }, 200);
                        that_1.cdr.markForCheck();
                    });
                });
            })
                .catch(function (error) {
                loader_1.dismiss();
                that_1.errMessage = error;
                that_1.donealready = false;
            });
        }
    };
    EnterCreditCardPage.prototype.ionViewDidLoad = function () {
    };
    EnterCreditCardPage.prototype.closeme = function () {
        this.view.dismiss();
    };
    EnterCreditCardPage.prototype.showAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'error',
            subTitle: msg,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    return EnterCreditCardPage;
}());
EnterCreditCardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-enter-credit-card',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/enter-credit-card/enter-credit-card.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Payment Method</ion-title>\n  </ion-navbar>\n</ion-header>\n\n  <ion-content padding class="backgroundGrey">\n    <div class="height20"></div>\n    <ion-card color="light" class="maxWidth480">\n      <ion-card-header class="menuBackGroundTwo" padding-bottom>\n        <ion-fab top center>\n          <ion-icon ion-fab ios="ios-card" md="md-card" style="font-size:30px; background-color:#818e9b; border-radius: 5rem; border: 2px solid #e0e0e0;"></ion-icon>\n        </ion-fab>\n        <ion-card-title text-center style="padding-top:30px">\n            <h3 class="textWhite">Credit or Debit Card</h3>\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content no-padding>\n        <ion-grid padding-top>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Card</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardNumber" maxlength="16" clearInput="false" required></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Expiry Month</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardExpiryMon"  maxlength="2"  clearInput="false" required></ion-input> \n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Expiry Year</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardExpiryYr"  maxlength="2"  clearInput="false" required></ion-input>  \n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>CVC</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardCvc" maxlength="4" clearInput="false" required></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col padding class="error" text-wrap *ngIf="errMessage.length">\n              <p>{{ errMessage }}</p>\n            </ion-col>\n          </ion-row>\n  \n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n</ion-content>\n<ion-footer>\n              <button ion-button full (click)="getToken()" color="secondary">Submit</button>\n</ion-footer>\n  '/*ion-inline-end:"/var/www/html/ionic/login/src/pages/enter-credit-card/enter-credit-card.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], EnterCreditCardPage);

//# sourceMappingURL=enter-credit-card.js.map

/***/ })

},[218]);
//# sourceMappingURL=main.js.map