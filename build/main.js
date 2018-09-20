webpackJsonp([19],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__multiple_multiple__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__specials_specials__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__address_address__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__concern_concern__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__history_history__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__handy_handy__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__map_map__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__checkout_checkout__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__payments_payments__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__myaccount_myaccount__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_onesignal__ = __webpack_require__(218);
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
    function MainPage(nav, navParams, loadingCtrl, modalCtrl, menuCtrl, connect, zone, alertCtrl, cdr, barcodeScanner, oneSignal) {
        this.nav = nav;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.connect = connect;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.barcodeScanner = barcodeScanner;
        this.oneSignal = oneSignal;
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
                var ths = { id: f[0], qty: f[1], pic: 'http://theparcelpeople.com.au/catalogue/pics/' + f[0] + '.jpg', title: f[3], price: f[2], company: f[4], personal: f[5], persdets: f[6] };
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
        var that = this;
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '';
        if (w.length) {
            var url = 'pushstatus.php?account=' + w;
            this.connect.getList(url).subscribe(function (data) {
                if (data.status == 'a')
                    that.askpush();
                if (data.status == 'i')
                    that.getpushinfo();
                if (data.gocode.length)
                    that.checkCode('*' + data.gocode);
            }, function (err) {
            });
        }
    };
    MainPage.prototype.getpushinfo = function () {
        var _this = this;
        //    this.oneSignal.startInit('ddb89a00-f822-4748-b8e0-6f0b9027d890', '703322744261');
        this.oneSignal.startInit('1bea01a3-9250-4411-a2d3-2173b44a98ad', '703322744261');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.endInit();
        var i = this.oneSignal.getIds();
        i.then(function (data) {
            var that = _this;
            var w = window.localStorage.getItem('userTag');
            if (!w)
                w = '';
            var url = 'pushtoken.php?account=' + w + '&token=' + data.userId;
            _this.connect.getList(url).subscribe(function (data) {
            }, function (err) {
            });
        });
    };
    MainPage.prototype.askpush = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Please Allow Notifications',
            subTitle: 'This will allow us to contact you about the progress of your orders and provide tracking information',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: function () {
                        _this.getpushinfo();
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.doSpecials = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Searching..."
        });
        loader.present();
        var url = 'getspecials.php?cart=' + window.localStorage.getItem('cart');
        // console.log(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.mytext = '';
            that.zone.run(function () {
                window.localStorage.removeItem('toadd');
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_6__specials_specials__["a" /* SpecialsPage */], { items: data.items });
            });
        }, function (err) {
            loader.dismiss();
            that.mytext = '';
            _this.connect.logError(err);
        });
    };
    MainPage.prototype.concern = function () {
        var usr = window.localStorage.getItem('userTag');
        if (!usr)
            usr = '';
        if (usr.length)
            this.nav.push(__WEBPACK_IMPORTED_MODULE_8__concern_concern__["a" /* ConcernPage */]);
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Please Log In',
                subTitle: 'Please go to the Your Account menu item to Log In before you lodge a concern',
                buttons: [
                    {
                        text: 'Ok',
                        handler: function () {
                        }
                    }
                ]
            });
            alert_1.present();
        }
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
    MainPage.prototype.showmodal = function () {
        var mdl = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_10__handy_handy__["a" /* HandyPage */], {}, { showBackdrop: true, enableBackdropDismiss: true });
        mdl.present();
    };
    MainPage.prototype.showAccount = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_15__myaccount_myaccount__["a" /* MyaccountPage */]);
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
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '';
        var url = 'getitems.php?code=' + s + '&cart=' + window.localStorage.getItem('cart') + '&id=' + w;
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
            this.nav.push(__WEBPACK_IMPORTED_MODULE_14__payments_payments__["a" /* PaymentsPage */]);
        }
        else
            this.pleaseSignUpAlert();
    };
    MainPage.prototype.showAddress = function () {
        var that = this;
        if (window.localStorage.getItem('userTag')) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_7__address_address__["a" /* AddressPage */]);
        }
        else
            this.pleaseSignUpAlert();
    };
    MainPage.prototype.doMap = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_11__map_map__["a" /* MapPage */]);
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
        this.nav.push(__WEBPACK_IMPORTED_MODULE_13__checkout_checkout__["a" /* CheckoutPage */]);
    };
    MainPage.prototype.tandc = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_12__tandc_tandc__["a" /* TandcPage */]);
    };
    MainPage.prototype.goProd = function (m) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: m, buttonmode: '' });
    };
    MainPage.prototype.orderHistory = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_9__history_history__["a" /* HistoryPage */]);
    };
    MainPage.prototype.enterPersonal = function (id) {
        var that = this;
        var pdesc = 'this product';
        var pdets = '';
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] == id) {
                pdesc = a[3];
                pdets = a[6];
            }
        }
        var alert = this.alertCtrl.create({
            title: 'Personalisation',
            message: 'Please enter the details that you would like for ' + pdesc,
            inputs: [
                {
                    name: 'dets',
                    placeholder: pdets
                }
            ],
            buttons: [
                { text: 'CANCEL',
                    role: 'cancel'
                },
                {
                    text: 'SAVE',
                    role: 'cancel',
                    handler: function (data) {
                        that.processPersonal(id, data.dets);
                    }
                }
            ]
        });
        alert.present();
    };
    MainPage.prototype.processPersonal = function (id, d) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] == id)
                a[6] = d;
            nw.push(a.join('^'));
        }
        window.localStorage.setItem('cart', nw.join('~'));
        this.recalc();
    };
    return MainPage;
}());
MainPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-main',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/main/main.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<button ion-button menuToggle color="dark"><ion-icon name="menu"></ion-icon></button>\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-menu id="mainmenu" [content]="myMenum" style="overflow:hidden" [persistent]=true >\n	<ion-content class="menucontainer">\n		<ion-item-group class="paddingMenu">\n			<button ion-item (click)="doScan()" class="list-item menuitems" menuClose>\n			   Scan Product\n			</button>\n			<button ion-item (click)="doMap()" class="list-item menuitems" menuClose>\n			   Find Local Offers\n			</button>\n			<button ion-item (click)="showAccount()" class="list-item menuitems" menuClose>\n			   Your Account\n			</button>\n			<button ion-item (click)="orderHistory()" class="list-item menuitems" menuClose>\n			   Order History\n			</button>\n			<button ion-item (click)="tandc()" class="list-item menuitems" menuClose>\n			   Terms & Conditions\n			</button>\n			<button ion-item (click)="concern()" class="list-item menuitems" menuClose>\n			   Raise A Concern\n			</button>\n	\n			<button ion-item (click)="signOutAlert()" class="list-item menuitems" menuClose>\n			   Sign Out\n			</button>\n			\n		</ion-item-group>\n	</ion-content>\n</ion-menu>\n\n<ion-content #myMenum text-center>\n<div *ngIf="!orderitems.length">\n\n<ion-grid>\n <ion-row text-center>\n  <ion-col col-3>\n  </ion-col>\n  <ion-col col-6>\n    <img src="./assets/img/background.jpg" style="width:100%">\n  </ion-col>\n  <ion-col col-3>\n  </ion-col>\n </ion-row>\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n<ion-item no-lines text-wrap text-center>\n<p>Welcome to Tella.  Our app allows you to make purchases instantly by scanning barcodes in a catalogue, magazine or flyer.</p>\n<p (click)="showmodal();" style="margin:18px; color:#4A8AFD"><u>Handy Tips & Info</u></p>\n<p>Enjoy the most convenient way to shop!</p>\n</ion-item>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n<ion-row text-center style="margin-top:10px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button icon-left block color="primary"  (click)="doScan();">|| | || &nbsp; &nbsp; SCAN BARCODE &nbsp; &nbsp; || | ||</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="dark" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n</div>\n<div *ngIf="orderitems.length">\n\n<img [src]="myPic" style="width:100%">\n<ion-grid>\n<ion-row text-center style="margin-top:10px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button block color="primary"  (click)="doScan()">Scan Another Item</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="dark" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n  <ion-grid>\n  <ion-row class="myborder" no-padding>\n  <ion-col col-12 no-padding>\n  <ion-item-divider text-center no-padding style="font-weight:bold">Your Cart Summary</ion-item-divider>\n  </ion-col>\n  </ion-row>\n  <ion-row class="myborder">\n  <ion-col col-8 text-left>\n  {{ itemcount }} item(s)\n  </ion-col>\n  <ion-col col-4 text-right>\n  ${{ total | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n   <ion-col col-8 (click)="calcShip()" text-left>\n     Ship To {{ userPostcode }} <div class="calcship">(Change)</div>\n  </ion-col>\n  <ion-col col-4 text-right>\n     ${{ freightAmount | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n  <ion-col col-8 text-left>\n    TOTAL\n  </ion-col>\n  <ion-col col-4 text-right>\n    ${{ orderTotal | number:\'1.2-2\' }}\n  </ion-col>\n </ion-row>\n <ion-row *ngIf="!freightValid" clss="myBorder">\n <ion-col col-12 text-center><ion-item text-center no-lines (click)="calcShip()" class="calcship">Calculate Shipping</ion-item></ion-col>\n </ion-row>\n </ion-grid>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n\n</ion-grid>\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of orderitems"  class="borderBottomGainsboroAlpha">\n<ion-grid>\n <ion-row>\n  <ion-col col-4 (click)="goProd(et)"><img [src]="et.pic" style="border:1px solid gainsboro"></ion-col>\n  <ion-col col-8><p class="cartitem" (click)="goProd(et)">{{ et.title }}</p>\n    <p class="cartitem price">${{ et.price }}</p>\n\n   <ion-grid>\n      <ion-row>\n        <ion-col col-10>\n           <p class="cartitem"><span class="updown" (click)="subProduct(et.id);">-</span><span class="updown"> {{ et.qty }} </span><span class="updown" (click)="addProduct(et.id);">+</span></p>\n        </ion-col>\n        <ion-col col-2 text-right>\n           <ion-icon name="close-circle" style="color:gray" (click)="removeProduct(et.id);"></ion-icon>\n        </ion-col>\n      </ion-row>\n   <ion-row *ngIf="et.personal">\n       <ion-col col-12>\n          <button ion-button small (click)="enterPersonal(et.id);">Personalise</button>\n       </ion-col>\n      </ion-row>\n   </ion-grid>\n  \n\n  </ion-col>\n </ion-row>\n</ion-grid>\n			</ion-item>\n		</ion-list>\n\n</div>\n</ion-content>\n\n<ion-footer>\n<div *ngIf="orderitems.length">\n<button ion-button color="secondary" full (click)="checkOut()" style="font-weight:bold!important">CHECK OUT</button>\n</div>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/main/main.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_17__ionic_native_onesignal__["a" /* OneSignal */]])
], MainPage);

//# sourceMappingURL=main.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MultiplePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(33);
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
        for (var ss in this.items) {
            if (this.items[ss].id == c)
                this.items[ss].added = 1;
            if (this.items[ss].added == 1)
                this.anychosen = true;
        }
        //   console.log('any='+this.anychosen);
    };
    MultiplePage.prototype.AddToCart = function () {
        var c = window.localStorage.getItem('cart');
        if (!c)
            c = '';
        for (var ss in this.items)
            if (this.items[ss].added > 0)
                c = "" + this.items[ss].id + "^1^" + this.items[ss].price + "^" + this.items[ss].title + "^" + this.items[ss].company + "^" + this.items[ss].personal + "^" + (c.length ? '~' : '') + c;
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
        selector: 'page-multiple',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/multiple/multiple.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerImg" style="width:90%">\n</ion-col>\n</ion-row>\n\n\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of items" class="borderBottomGainsboroAlpha">\n				\n<ion-grid>\n<ion-row>\n<ion-col col-4>\n 					<img [src]="et.pic" (click)="goProduct(et);">\n</ion-col><ion-col col-8>\n					<h1 class="textDodger fontSize10" (click)="goProduct(et);">{{ et.title }}</h1>\n<p class="price">${{ et.price }}</p>\n   <button  *ngIf="(et.qty>0) && (et.added==0)" ion-button small color="secondary" (click)="selectProduct(et.pos);" outline>Select</button>\n   <button  *ngIf="(et.qty<1) && (et.added==0)" ion-button small color="danger">Sold Out</button>\n <button  *ngIf="et.added>0" ion-button small color="secondary" (click)="unselectProduct(et.pos);" >Selected</button>\n <button  *ngIf="et.added<0" ion-button small color="primary">In Cart</button>\n <span style="margin-left:20px; padding-top:5px; font-size:0.8em!important; color:#4A8AFA" (click)="goProduct(et);"><u>View</u></span>\n</ion-col>\n</ion-row>\n</ion-grid>\n				\n			</ion-item>\n		</ion-list>\n</ion-content>\n<ion-footer  *ngIf="anychosen">\n<button ion-button full (click)="AddToCart()" color="secondary" style="font-weight:bold!important">ADD TO CART</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/multiple/multiple.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], MultiplePage);

//# sourceMappingURL=multiple.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecialsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SpecialsPage = (function () {
    function SpecialsPage(nav, navParams, view, connect, zone, alertCtrl, cdr) {
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
    }
    SpecialsPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    SpecialsPage.prototype.recalc = function () {
        var c = window.localStorage.getItem('toadd');
        if (!c)
            c = '';
        this.anychosen = false;
        for (var ss in this.items) {
            if (this.items[ss].id == c)
                this.items[ss].added = 1;
            if (this.items[ss].added == 1)
                this.anychosen = true;
        }
        //   console.log('any='+this.anychosen);
    };
    SpecialsPage.prototype.AddToCart = function () {
        var c = window.localStorage.getItem('cart');
        if (!c)
            c = '';
        for (var ss in this.items)
            if (this.items[ss].added > 0)
                c = "" + this.items[ss].id + "^1^" + this.items[ss].price + "^" + this.items[ss].title + "^" + this.items[ss].company + (c.length ? '~' : '') + c;
        window.localStorage.setItem('cart', c);
        this.nav.pop();
    };
    SpecialsPage.prototype.selectProduct = function (pos) {
        for (var ss in this.items)
            if (this.items[ss].pos == pos)
                this.items[ss].added = 1;
        this.anychosen = true;
    };
    SpecialsPage.prototype.unselectProduct = function (pos) {
        this.anychosen = false;
        for (var ss in this.items) {
            if (this.items[ss].pos == pos)
                this.items[ss].added = 0;
            if (this.items[ss].added == 1)
                this.anychosen = true;
        }
    };
    SpecialsPage.prototype.goProduct = function (item) {
        window.localStorage.removeItem('toadd');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: item, buttonmode: (item.added == 0 ? 'SELECT' : '') });
    };
    SpecialsPage.prototype.closeme = function () {
        this.nav.pop();
    };
    return SpecialsPage;
}());
SpecialsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-specials',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/specials/specials.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerImg" style="width:90%">\n</ion-col>\n</ion-row>\n\n\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of items" class="borderBottomGainsboroAlpha">\n				\n<ion-grid>\n<ion-row>\n<ion-col col-4>\n 					<img [src]="et.pic" (click)="goProduct(et);">\n</ion-col><ion-col col-8>\n					<h1 class="textDodger fontSize10" (click)="goProduct(et);">{{ et.title }}</h1>\n<p class="price">${{ et.price }}</p>\n   <button  *ngIf="(et.qty>0) && (et.added==0)" ion-button small color="secondary" (click)="selectProduct(et.pos);" outline>Select</button>\n   <button  *ngIf="(et.qty<1) && (et.added==0)" ion-button small color="danger">Sold Out</button>\n <button  *ngIf="et.added>0" ion-button small color="secondary" (click)="unselectProduct(et.pos);" >Selected</button>\n <button  *ngIf="et.added<0" ion-button small color="primary">In Cart</button>\n <span style="margin-left:20px; padding-top:5px; font-size:0.8em!important; color:#4A8AFA" (click)="goProduct(et);"><u>View</u></span>\n</ion-col>\n</ion-row>\n</ion-grid>\n				\n			</ion-item>\n		</ion-list>\n</ion-content>\n<ion-footer  *ngIf="anychosen">\n<button ion-button full (click)="AddToCart()" color="secondary" style="font-weight:bold!important">ADD TO CART</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/specials/specials.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], SpecialsPage);

//# sourceMappingURL=specials.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Navbar */])
], AddressPage.prototype, "navBar", void 0);
AddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-address',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/address/address.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Addresses</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n		<ion-item-sliding *ngFor="let m of methods">\n			<ion-item class="height80 borderBottom" no-lines>\n                           <ion-row>\n                            <ion-col col-2>\n				<div  *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n                            </ion-col>\n                            <ion-col col-9>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                            <ion-col col-1>\n				 <ion-icon item-right ios="md-more" md="md-more"></ion-icon>\n                            </ion-col>\n                          </ion-row>\n			</ion-item>\n			<ion-item-options side="right">\n	      <button ion-button color="danger" (click)="delete(m.id)">\n	        <ion-icon ios="ios-trash" md="md-trash" ></ion-icon>\n	        Delete\n	      </button>\n				<button ion-button color="secondary" (click)="makeDefault(m.id)">\n				 <ion-icon ios="ios-add-circle" md="md-add-circle"></ion-icon>\n				 Make<br>Default\n			 </button>\n	    </ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/address/address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], AddressPage);

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConversationPage = (function () {
    function ConversationPage(navCtrl, navParams, loadingCtrl, alertCtrl, connect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.connect = connect;
        this.concern = [];
        this.clist = [];
        this.cid = 0;
        this.concern = { date: '', info: '' };
        this.newmode = 0;
        this.clist = [];
        this.cid = this.navParams.get('id');
    }
    ConversationPage.prototype.ionViewDidLoad = function () {
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        loader.present();
        var url = 'getconv.php?id=' + this.cid + '&rnd=' + Math.random();
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.clist = data.list;
        }, function (err) {
            loader.dismiss();
        });
    };
    ConversationPage.prototype.sendConcern = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Sending..."
        });
        loader.present();
        var url = 'sendconcern2.php?user=' + window.localStorage.getItem('userTag') + '&cid=' + this.cid + '&info=' + encodeURIComponent(this.concern.info);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.concern.info = '';
            that.concern.date = '';
            var alert = _this.alertCtrl.create({
                title: 'New Message Sent',
                subTitle: 'We will respond as soon as possible',
                buttons: [
                    {
                        text: 'Ok',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            alert.present();
        }, function (err) {
            loader.dismiss();
        });
    };
    return ConversationPage;
}());
ConversationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-conversation',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/conversation/conversation.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Raise A Concern</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n<div *ngIf="newmode==1">\n		<ion-grid no-padding>\n			<ion-row style="margin-bottom:12px">\n			   <ion-col col-1>&nbsp;</ion-col>\n 			   <ion-col col-3><img src="./assets/img/support2.jpg"></ion-col>\n			   <ion-col col-1>&nbsp;</ion-col>\n 			   <ion-col col-6><p>Your satisfaction is important to us!</p><p>Please type your message below to give us more information about your query</p></ion-col>\n   <ion-col col-1>&nbsp;</ion-col>\n 			\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>New Message</ion-label>\n						<ion-textarea [(ngModel)]="concern.info" rows="8"></ion-textarea>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n <ion-row>\n   <ion-col center>\n<p>You can click <span style="color:dodgerblue"><u>HERE</u></span> to close the on-screen keyboard</p>\n   </ion-col>\n </ion-row>\n\n		</ion-grid>\n</div>\n<div *ngIf="newmode==0">\n  <ion-list>\n <ion-item *ngFor="let l of clist" text-wrap [style.background]=l.backcolor>\n   <div><div style="float:right; color:dodgerblue"><small>Sent by: {{ l.sentby }}</small></div><h3><i>Sent: {{ l.stamp }} </i> </h3> </div>\n     <p text-wrap [innerHTML]="l.info"></p>\n </ion-item>\n</ion-list>\n</div>\n</ion-content>\n<ion-footer>\n<div *ngIf="newmode==1"><button ion-button full (click)="sendConcern()" color="secondary" style="font-weight:bold!important">SEND</button></div>\n<div *ngIf="newmode==0"><button ion-button full (click)="this.newmode=1;" color="secondary" style="font-weight:bold!important">ADD MESSAGE</button></div>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/conversation/conversation.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */]])
], ConversationPage);

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConcernPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__conversation_conversation__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConcernPage = (function () {
    function ConcernPage(navCtrl, navParams, loadingCtrl, alertCtrl, connect) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.connect = connect;
        this.concern = [];
        this.clist = [];
        this.concern = { date: '', info: '' };
        this.newmode = 0;
        this.clist = [];
    }
    ConcernPage.prototype.ionViewDidLoad = function () {
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Loading..."
        });
        loader.present();
        var url = 'getconcerns.php?user=' + window.localStorage.getItem('userTag') + '&rnd=' + Math.random();
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.clist = data.list;
            if (that.clist.length)
                that.newmode = 0;
            else
                that.newmode = 1;
        }, function (err) {
            loader.dismiss();
        });
    };
    ConcernPage.prototype.goConv = function (i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__conversation_conversation__["a" /* ConversationPage */], { id: i });
    };
    ConcernPage.prototype.sendConcern = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Sending..."
        });
        loader.present();
        var url = 'sendconcern.php?user=' + window.localStorage.getItem('userTag') + '&date=' + encodeURIComponent(this.concern.date) + '&info=' + encodeURIComponent(this.concern.info);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.concern.info = '';
            that.concern.date = '';
            var alert = _this.alertCtrl.create({
                title: 'Message Sent',
                subTitle: 'We will address your concern as soon as possible',
                buttons: [
                    {
                        text: 'Ok',
                        handler: function () {
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            alert.present();
        }, function (err) {
            loader.dismiss();
        });
    };
    return ConcernPage;
}());
ConcernPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-concern',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/concern/concern.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Raise A Concern</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n<div *ngIf="newmode==1">\n		<ion-grid no-padding>\n			<ion-row style="margin-bottom:12px">\n			   <ion-col col-1>&nbsp;</ion-col>\n 			   <ion-col col-3><img src="./assets/img/support2.jpg"></ion-col>\n			   <ion-col col-1>&nbsp;</ion-col>\n 			   <ion-col col-6><p>Your satisfaction is important to us!</p><p>Please let us know your concern.  We\'re here to help</ion-col>\n   <ion-col col-1>&nbsp;</ion-col>\n 			\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Purchase Date</ion-label>\n						<ion-input type="text" [(ngModel)]="concern.date" placeholder="(if applicable)"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Your Concern</ion-label>\n						<ion-textarea [(ngModel)]="concern.info" rows="8"></ion-textarea>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n <ion-row>\n   <ion-col center>\n<p>You can click <span style="color:dodgerblue"><u>HERE</u></span> to close the on-screen keyboard</p>\n   </ion-col>\n </ion-row>\n		</ion-grid>\n</div>\n<div *ngIf="newmode==0">\n  <ion-list>\n <ion-item *ngFor="let l of clist" (click)="goConv(l.id)">\n   <div><div style="float:right; color:dodgerblue"><small><u>View Conversation</u></small></div><h3><i>Lodged: {{ l.stamp }} </i> </h3> </div>\n     <p>{{ l.info }}</p>\n </ion-item>\n</ion-list>\n</div>\n</ion-content>\n<ion-footer>\n<div *ngIf="newmode==1"><button ion-button full (click)="sendConcern()" color="secondary" style="font-weight:bold!important">SEND</button></div>\n<div *ngIf="newmode==0"><button ion-button full (click)="this.newmode=1;" color="secondary" style="font-weight:bold!important">NEW CONCERN</button></div>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/concern/concern.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */]])
], ConcernPage);

//# sourceMappingURL=concern.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vendor2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
 * Generated class for the Vendor2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Vendor2Page = (function () {
    function Vendor2Page(navCtrl, navParams, connect, zone, cdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.connect = connect;
        this.zone = zone;
        this.cdr = cdr;
        this.myPic = './assets/img/blankbanner.jpg';
        this.content = '';
        this.page = this.navParams.get("page");
        this.heading = this.navParams.get("heading");
    }
    Vendor2Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        var c = window.localStorage.getItem('cart').split('^');
        this.myPic = 'http://theparcelpeople.com.au/catalogue/banners/' + c[4] + '.jpg?v=3';
        var url = 'getvendor.php?page=' + this.page + '&cart=' + window.localStorage.getItem('cart');
        this.connect.getList(url).subscribe(function (data) {
            that.zone.run(function () {
                that.content = data.data;
                that.cdr.markForCheck();
            });
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    return Vendor2Page;
}());
Vendor2Page = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-vendor2',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/vendor2/vendor2.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ heading }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n<img [src]="myPic" style="width:100%">\n\n <ion-item text-wrap>\n<p style="margin-top:15px" [innerHTML]="content"></p>\n</ion-item>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/vendor2/vendor2.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], Vendor2Page);

//# sourceMappingURL=vendor2.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendortermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendor2_vendor2__ = __webpack_require__(116);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VendortermsPage = (function () {
    function VendortermsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myPic = './assets/img/blankbanner.jpg';
        this.hlist = [];
    }
    VendortermsPage.prototype.ionViewDidLoad = function () {
        var c = window.localStorage.getItem('cart').split('^');
        this.myPic = 'http://theparcelpeople.com.au/catalogue/banners/' + c[4] + '.jpg?v=3';
        var h = ['Postage Policy', 'Returns Policy', 'General Terms & Conditions', 'Privacy Policy'];
        var cnt = 0;
        for (var i in h) {
            var ar = { 'num': cnt++, 'name': h[i] };
            this.hlist.push(ar);
        }
    };
    VendortermsPage.prototype.goPage = function (a) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__vendor2_vendor2__["a" /* Vendor2Page */], { 'page': a.num, 'heading': a.name });
    };
    return VendortermsPage;
}());
VendortermsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tandc',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/vendorterms/vendorterms.html"*/'<!--\n  Generated template for the TandcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Terms & Conditions</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<img [src]="myPic" style="width:100%">\n\n<ion-list>\n <button ion-item *ngFor="let h of hlist" (click)="goPage(h)">\n   {{ h.name }}\n </button>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/vendorterms/vendorterms.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], VendortermsPage);

//# sourceMappingURL=vendorterms.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vendorterms_vendorterms__ = __webpack_require__(117);
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
    function CheckoutPage(navCtrl, cdr, alertCtrl, fb, navParams, loadingCtrl, connect, zone) {
        this.navCtrl = navCtrl;
        this.cdr = cdr;
        this.alertCtrl = alertCtrl;
        this.fb = fb;
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
        this.ototal = 0;
        this.opostage = 0;
        this.oitems = 0;
        this.bannerPic = './assets/img/blankbanner.jpg';
        this.voucher = '';
        this.vcode = '';
        this.discount = 0;
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
    CheckoutPage.prototype.recalc = function () {
        var _this = this;
        this.vcode = window.localStorage.getItem('vcode');
        if (!this.vcode)
            this.vcode = '';
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
            this.connect.getList('getuserdetails.php?amode=' + this.amode + '&pmode=' + this.pmode + '&user=' + this.user + '&address=' + this.address + '&payment=' + this.payment + '&vcode=' + this.vcode + '&cart=' + window.localStorage.getItem('cart')).subscribe(function (data) {
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
                    that_1.ototal = data.ototal;
                    that_1.oitems = data.oitems;
                    that_1.opostage = data.opostage;
                    that_1.payment = data.payment;
                    that_1.discount = data.discount;
                    that_1.voucher = data.voucher;
                    that_1.bannerPic = 'http://theparcelpeople.com.au/catalogue/banners/' + data.company + '.jpg?v=2';
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
    CheckoutPage.prototype.openSignUpPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__email_login_email_login__["a" /* EmailLoginPage */]);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__enter_address_enter_address__["a" /* EnterAddressPage */]);
    };
    CheckoutPage.prototype.showPayment = function (a) {
        window.localStorage.setItem('userPayment', a);
        this.pmode = 0;
        this.recalc();
    };
    CheckoutPage.prototype.showEnterPayment = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */], { stripe_pub: this.stripe_pub });
    };
    CheckoutPage.prototype.showvterms = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__vendorterms_vendorterms__["a" /* VendortermsPage */]);
    };
    CheckoutPage.prototype.doConfirm = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var url = 'saveorder.php?user=' + window.localStorage.getItem('userTag') + '^' + this.address + '^' + this.payment + '&vcode=' + this.vcode + '&discount=' + this.discount + '&cart=' + window.localStorage.getItem('cart');
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__tandc_tandc__["a" /* TandcPage */]);
    };
    CheckoutPage.prototype.orderComplete = function () {
        var that = this;
        window.localStorage.removeItem('vcode');
        that.vcode = '';
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
    CheckoutPage.prototype.enterVoucher = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Code Entry',
            message: 'Please enter your code',
            inputs: [
                {
                    name: 'dets',
                    placeholder: that.vcode
                }
            ],
            buttons: [
                { text: 'CANCEL',
                    role: 'cancel'
                },
                {
                    text: 'SAVE',
                    role: 'cancel',
                    handler: function (data) {
                        that.vcode = data.dets;
                        window.localStorage.setItem('vcode', data.dets);
                        that.recalc();
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
        selector: 'page-checkout',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/checkout/checkout.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Check-Out</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<ion-item text-center>\n<p><b>By continuing, you agree to the</b><br><a href="#" (click)="showvterms()">Vendor Terms and Conditions</a></p>\n</ion-item>\n<div *ngIf="address.length" style="text-align:center; border-bottom:1px solid gainsboro">\n  \n <ion-grid>\n	<ion-row>\n	<ion-col>\n	<img [src]="bannerPic" style="width:100%">\n	</ion-col>\n	</ion-row>\n     <ion-row>\n       <ion-col col-1></ion-col>\n       <ion-col col-5 style="text-align:left; border-bottom:1px solid #DDDDDD">Items Sub-total:</ion-col>\n       <ion-col col-5 style="text-align:right; border-bottom:1px solid #DDDDDD">${{ this.oitems }}</ion-col>\n       <ion-col col-1></ion-col>\n    </ion-row>\n     <ion-row *ngIf="discount > 0">\n       <ion-col col-1></ion-col>\n       <ion-col col-5 style="text-align:left; border-bottom:1px solid #DDDDDD">Less Discount</ion-col>\n       <ion-col col-5 style="text-align:right; border-bottom:1px solid #DDDDDD">-${{ this.discount }}</ion-col>\n       <ion-col col-1></ion-col>\n    </ion-row>\n\n     <ion-row>\n       <ion-col col-1></ion-col>\n       <ion-col col-5 style="text-align:left; border-bottom:1px solid #DDDDDD">Postage:</ion-col>\n       <ion-col col-5 style="text-align:right; border-bottom:1px solid #DDDDDD">${{ this.opostage }}</ion-col>\n       <ion-col col-1></ion-col>\n    </ion-row>\n     <ion-row>\n       <ion-col col-1></ion-col>\n       <ion-col col-5 style="text-align:left">Order Total:</ion-col>\n       <ion-col col-5 style="text-align:right">${{ this.ototal }}</ion-col>\n       <ion-col col-1></ion-col>\n    </ion-row>\n   </ion-grid>\n</div>\n<div *ngIf="voucher.length" (click)="enterVoucher()" style="text-align:center; color:dodgerblue; margin-top:5px; margin-bottom:5px">\n {{ voucher }}\n</div>\n<div *ngIf="!user.length">\n <ion-item padding no-lines text-wrap>\n  <p>Having an account allows you to view & track your orders as well as saving your details for fast checkouts in future</p>\n  <ion-grid>\n	\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left class="facebook-btn" (click)="loginUserWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;Connect with Facebook</button>\n			</ion-col>\n		</ion-row>\n              <ion-row>\n			<ion-col padding-top>\n				<button ion-button full icon-left  (click)="openSignUpPage()"><ion-icon name="ios-mail"></ion-icon>&nbsp;&nbsp;Enter via email</button>\n			</ion-col>\n	          </ion-row>\n		<ion-row>\n			<ion-col padding class="error" *ngIf="error">\n				 <p>{{error}}</p>\n			 </ion-col>\n		 </ion-row>\n		<ion-row padding-top>\n			<ion-col>\n				<p class="fontSize10">By signing up, you agree to Tella\'s<br><a (click)="openTermsAndConditions()">Terms and Conditions</a></p>\n			</ion-col>\n		</ion-row>\n  </ion-grid>\n </ion-item>\n</div>\n<div *ngIf="user.length">\n <div>Checkout as :-</div>\n <p class="userdetails" [innerHTML]="username"> </p>\n <ion-item text-right no-lines>\n  <button ion-button small outline (click)="doLogout()">Change</button>\n </ion-item> \n <div *ngIf="address.length" style="border-top:1px solid gainsboro">\n \n  <div>Shipping Address :-</div>\n  <p class="userdetails" [innerHTML]="shipping"> </p>\n  <ion-item text-right no-lines>\n   <button ion-button small outline (click)="showAddress(\'\')">Change</button>\n  </ion-item> \n\n  <div *ngIf="payment.length"  style="border-top:1px solid gainsboro">\n   <div>Payment Method :-</div>\n   <p class="userdetails" [innerHTML]="paycard"> </p>\n   <ion-item text-right no-lines>\n    <button ion-button small outline (click)="showPayment(\'\')">Change</button>\n   </ion-item> \n  </div>\n  <div *ngIf="!payment.length"  style="border-top:1px solid gainsboro"> \n   <div>Choose Payment Method :-</div>\n    <ion-list class="noBottomMargin">\n     <ion-item class="height80 borderBottom" no-lines  *ngFor="let m of pmethods">\n       <div (click)="showPayment(m.id);">\n       <ion-row>\n       <ion-col col-1>\n       </ion-col>\n       <ion-col col-11>\n       <div>\n	{{ m.typ }} ending in **** {{ m.last4 }}\n       </div>\n       </ion-col>\n       </ion-row>\n       </div>\n     </ion-item>\n    </ion-list>\n\n    <button ion-item (click)="showEnterPayment()" class="height80 borderBottom" no-lines>\n		Add Payment Method\n    </button>\n   </div>\n </div> \n <div *ngIf="!address.length"  style="border-top:1px solid gainsboro"> \n <div>Choose Shipping Address :-</div>\n\n	<ion-list class="noBottomMargin">\n			<ion-item class="height80 borderBottom" no-lines  *ngFor="let m of methods">\n                         <div (click)="showAddress(m.id);">\n                           <ion-row>\n                            <ion-col col-1>\n                            </ion-col>\n                            <ion-col col-11>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                          </ion-row>\n                        </div>\n		</ion-item>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n\n </div>\n</div> \n</ion-content>\n<ion-footer *ngIf="allok">\n<button ion-button full (click)="doConfirm()" color="secondary" style="font-weight:bold!important">CONFIRM</button>\n</ion-footer>'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/checkout/checkout.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Navbar */])
], PaymentsPage.prototype, "navBar", void 0);
PaymentsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payments',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/payments/payments.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Payment Methods</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n		<ion-item-sliding *ngFor="let m of methods">\n			<ion-item class="height80 borderBottom" no-lines>\n				<div style="float:left" *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n				{{ m.typ }} ending in **** {{ m.last4 }}\n				 <ion-icon item-right ios="md-more" md="md-more"></ion-icon>\n			</ion-item>\n			<ion-item-options side="right">\n	      <button ion-button color="danger" (click)="delete(m.id, m.cardid)">\n	        <ion-icon ios="ios-trash" md="md-trash" ></ion-icon>\n	        Delete\n	      </button>\n				<button ion-button color="secondary" (click)="makeDefault(m.id, m.cardid)">\n				 <ion-icon ios="ios-add-circle" md="md-add-circle"></ion-icon>\n				 Make<br>Default\n			 </button>\n	    </ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterCreditCard()" class="height80 borderBottom" no-lines>\n		Add Payment Method\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/payments/payments.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], PaymentsPage);

//# sourceMappingURL=payments.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShippingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ShippingPage);

//# sourceMappingURL=shipping.js.map

/***/ }),

/***/ 129:
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
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account/account.module": [
		296,
		18
	],
	"../pages/address/address.module": [
		299,
		17
	],
	"../pages/checkout/checkout.module": [
		308,
		16
	],
	"../pages/choose-address/choose-address.module": [
		311,
		15
	],
	"../pages/concern/concern.module": [
		301,
		14
	],
	"../pages/conversation/conversation.module": [
		300,
		13
	],
	"../pages/email-login/email-login.module": [
		304,
		12
	],
	"../pages/enter-address/enter-address.module": [
		298,
		11
	],
	"../pages/enter-credit-card/enter-credit-card.module": [
		305,
		10
	],
	"../pages/multiple/multiple.module": [
		295,
		9
	],
	"../pages/oneitem/oneitem.module": [
		294,
		8
	],
	"../pages/payments/payments.module": [
		309,
		7
	],
	"../pages/push/push.module": [
		312,
		0
	],
	"../pages/register/register.module": [
		303,
		6
	],
	"../pages/shipping/shipping.module": [
		310,
		5
	],
	"../pages/specials/specials.module": [
		297,
		4
	],
	"../pages/tandc/tandc.module": [
		302,
		3
	],
	"../pages/vendor2/vendor2.module": [
		306,
		2
	],
	"../pages/vendorterms/vendorterms.module": [
		307,
		1
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
webpackAsyncContext.id = 171;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tandc2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */]])
], Tandc2Page);

//# sourceMappingURL=tandc2.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__histitems_histitems__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(217);
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
    function HistoryPage(navCtrl, navParams, zone, cdr, connect, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.cdr = cdr;
        this.connect = connect;
        this.iab = iab;
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
    HistoryPage.prototype.showTrack = function (url) {
        if (url.length) {
            var browser = this.iab.create(url, '_blank', 'location=no');
        }
    };
    HistoryPage.prototype.gotoTrans = function (h) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__histitems_histitems__["a" /* HistitemsPage */], { order: h.id });
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/history/history.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Order History</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<div *ngIf="!hist.length">\n<ion-item text-wrap>\n<h2>You have not made any Orders</h2>\n</ion-item>\n<ion-item text-wrap>\n<h2>When you place orders with the Tella App they will appear here</h2>\n</ion-item>\n</div>\n<div *ngIf="hist.length">\n<ion-list>\n <ion-item *ngFor="let h of hist">\n   <h1  (click)="gotoTrans(h)">{{ h.company }}</h1>\n   <div>\n   <div style="float:right"  (click)="gotoTrans(h)"><h3><i>{{ h.date }} </i> </h3> </div>\n   <h2  (click)="gotoTrans(h)">${{ h.amount }}</h2>\n   <h3 style="color:red"  (click)="showTrack(h.trackurl)" [innerHTML]=h.tracking></h3>\n   </div>\n </ion-item>\n</ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/history/history.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistitemsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_main__ = __webpack_require__(109);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], HistitemsPage);

//# sourceMappingURL=histitems.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HandyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HandyPage = (function () {
    function HandyPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    HandyPage.prototype.ionViewDidLoad = function () {
    };
    HandyPage.prototype.goback = function () {
        this.viewCtrl.dismiss();
    };
    return HandyPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Slides */])
], HandyPage.prototype, "slides", void 0);
HandyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-handy',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/handy/handy.html"*/'<ion-content text-center>\n<ion-item no-lines style="margin-top:10px; color:red" text-right (click)="goback()"><ion-icon name="close"></ion-icon> Close</ion-item>\n<ion-slides style="height:90%; max-height:90%">\n  <ion-slide>\n      <div style="height:100px; min-height:100px">\n       <img src="./assets/img/shield-tick.png" style="width:90px">\n      </div>\n       <div style="height:130px; min-height:130px; font-size:0.8em; padding: 20px 10px 15px 10px !important"><p>We work only with carefully selected and trusted retailers.</p></div>\n       <img src="./assets/img/modal-1.PNG" style="width:45px!important">\n  </ion-slide>\n  <ion-slide>\n      <div style="height:100px; min-height:100px; max-height:100px">\n       <img src="./assets/img/10cm-separation-v3.PNG" style="height:90px">\n      </div>\n       <div style="height:130px; min-height:130px; font-size:0.8em; padding:20px 10px 15px 10px !important"><p>Allow about 10cm from the barcode to your phone.  If you are unable to scan for any reason, please enter the product code manually.</p></div>\n       <img src="./assets/img/modal-2.PNG" style="width:45px!important">\n  </ion-slide>\n  <ion-slide>\n       <div style="height:90px; min-height:90px">\n       <img src="./assets/img/padlock.png" style="height:90px">\n       </div>\n       <div style="height:130px; min-height:130px; font-size:0.8em; padding:20px 10px 15px 10px !important"><p>Your credit card details are securely stored and encrypted.</p></div>\n       <img src="./assets/img/modal-3.PNG" style="width:45px!important">\n  </ion-slide>\n</ion-slides>\n\n</ion-content>\n\n\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/handy/handy.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */]])
], HandyPage);

//# sourceMappingURL=handy.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(223);
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
                    google.maps.event.addListener(that.markers[cnt], 'click', function () {
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyaccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(108);
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
    function MyaccountPage(navCtrl, cdr, fb, alertCtrl, navParams, loadingCtrl, connect, zone, barcodeScanner) {
        this.navCtrl = navCtrl;
        this.cdr = cdr;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.connect = connect;
        this.zone = zone;
        this.barcodeScanner = barcodeScanner;
        this.user = '';
        this.address = '';
        this.username = '';
        this.allowpush = true;
        this.companies = [];
        this.FB_APP_ID = 1455239151263568;
        this.reg = {
            id: '',
            email: '',
            firstname: '',
            surname: '',
            phone: '',
            postcode: ''
        };
        this.allowpush = true;
        this.companies = [];
    }
    MyaccountPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    MyaccountPage.prototype.scanCustomer = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (!barcodeData.cancelled) {
                _this.customerNumber(barcodeData.text);
            }
        }, function (err) {
        });
    };
    MyaccountPage.prototype.customerNumber = function (s) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Searching..."
        });
        loader.present();
        var url = 'getcustomer.php?code=' + s;
        // console.log(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.zone.run(function () {
                if (data.success) {
                    window.localStorage.setItem('userTag', data.user);
                    that.recalc();
                }
                else
                    that.noCustomer();
            });
        }, function (err) {
            loader.dismiss();
            _this.connect.logError(err);
        });
    };
    MyaccountPage.prototype.noCustomer = function () {
        var alert = this.alertCtrl.create({
            title: 'Tella Message',
            subTitle: 'The barcode that you scanned is not valid as a Customer Number.',
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
                    that_1.allowpush = data.allowpush;
                    that_1.companies = data.companies;
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
    MyaccountPage.prototype.savepushchange = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Updating..."
        });
        loader.present();
        var url = 'updatepush.php?account=' + window.localStorage.getItem('userTag') + '&val=' + (this.allowpush ? '1' : '0');
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
            _this.connect.logError(err);
        });
    };
    MyaccountPage.prototype.savecompanypushchange = function (i) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Updating..."
        });
        loader.present();
        var url = 'updatepushcompany.php?account=' + window.localStorage.getItem('userTag') + '&index=' + i + '&val=' + (this.companies[i].allow ? '1' : '0');
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
            _this.connect.logError(err);
        });
    };
    return MyaccountPage;
}());
MyaccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-myaccount',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/myaccount/myaccount.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<div *ngIf="!user.length">\n <ion-item padding no-lines text-wrap>\n  <p>Having an account allows you to view & track your orders as well as saving your details for fast checkouts in future</p>\n  <ion-grid>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left class="facebook-btn" (click)="loginUserWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>&nbsp;&nbsp;Connect with Facebook</button>\n			</ion-col>\n		</ion-row>\n		<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left  (click)="openSignUpPage()"><ion-icon name="ios-mail"></ion-icon>&nbsp;&nbsp;Enter via email</button>\n			</ion-col>\n	          </ion-row>\n	<ion-row text-center>\n			<ion-col padding-top>\n				<button ion-button full icon-left  (click)="scanCustomer()"><ion-icon name="ios-barcode"></ion-icon>&nbsp;&nbsp;Scan customer number</button>\n			</ion-col>\n	          </ion-row>\n\n\n		<ion-row>\n			<ion-col padding class="error" *ngIf="error">\n				 <p>{{error}}</p>\n			 </ion-col>\n		 </ion-row>\n		<ion-row padding-top>\n			<ion-col>\n				<p class="fontSize10">By signing up, you agree to Tella\'s<br><a (click)="openTermsAndConditions()">Terms and Conditions</a></p>\n			</ion-col>\n		</ion-row>\n  </ion-grid>\n </ion-item>\n</div>\n<div *ngIf="user.length">\n\n		<ion-grid no-padding>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>First Name</ion-label>\n						<ion-input type="text" [(ngModel)]="reg.firstname"></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Last Name</ion-label>\n						<ion-input type="text" [(ngModel)]="reg.surname"></ion-input>\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Phone Number</ion-label>\n						<ion-input type="tel" [(ngModel)]="reg.phone"  ></ion-input>\n					</ion-item>\n				</ion-col>\n				<ion-col>\n					<ion-item>\n						<ion-label stacked>Email</ion-label>\n						<ion-input type="email" [(ngModel)]="reg.email"  ></ion-input>\n\n					</ion-item>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n			  <ion-col col-9>\n			    <ion-item>\n				<ion-label>Allow Push Notifications</ion-label>\n			    </ion-item>\n                       </ion-col>\n                       <ion-col col-3>\n                          <ion-item>\n				<ion-toggle [(ngModel)]="allowpush" (ionChange)="savepushchange()"></ion-toggle>\n                          </ion-item>\n			  </ion-col>\n			</ion-row>\n                    \n                     <ion-item *ngIf="allowpush" no-padding>\n                       <ion-row *ngFor="let c of companies; let i = index;">\n			  <ion-col col-9>\n			    <ion-item>\n				<ion-label>{{c.name}}</ion-label>\n			    </ion-item>\n                       </ion-col>\n                       <ion-col col-3>\n                          <ion-item no-padding>\n				<ion-toggle [(ngModel)]="companies[i].allow" (ionChange)="savecompanypushchange(i)"></ion-toggle>\n                          </ion-item>\n			  </ion-col>\n			</ion-row>\n                    </ion-item>\n		</ion-grid>\n</div> \n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/myaccount/myaccount.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__providers_connect__["a" /* Connect */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_connect__["a" /* Connect */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]) === "function" && _j || Object])
], MyaccountPage);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=myaccount.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChooseAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shipping_shipping__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Navbar */])
], ChooseAddressPage.prototype, "navBar", void 0);
ChooseAddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-choose-address',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/choose-address/choose-address.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Shipping Address</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content  class="backgroundGrey">\n	<ion-list class="noBottomMargin">\n			<ion-item class="height80 borderBottom" no-lines  *ngFor="let m of methods">\n                         <button ion-button (click)="showShipping(m);">\n                           <ion-row>\n                            <ion-col col-2>\n				<div  *ngIf="m.dflt==1">\n					<ion-icon ios="ios-checkmark-circle" md="md-checkmark-circle" color="secondary">&nbsp;&nbsp;</ion-icon>\n				</div>\n                            </ion-col>\n                            <ion-col col-10>\n				<div>{{ m.addr }}</div><div>{{m.suburb}} {{m.state}} {{m.postcode}}</div>\n                                <div>{{ m.country }}</div>\n                            </ion-col>\n                          </ion-row>\n                        </button>\n		</ion-item>\n	</ion-list>\n	\n  <button ion-item (click)="showEnterAddress()" class="height80 borderBottom" no-lines>\n		Add Address\n  </button>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/choose-address/choose-address.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], ChooseAddressPage);

//# sourceMappingURL=choose-address.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(245);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_20" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_main_main__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_account_account__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_address_address__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_history_history__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_concern_concern__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_conversation_conversation__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_handy_handy__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_specials_specials__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_tandc_tandc__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_tandc2_tandc2__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_vendorterms_vendorterms__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_vendor2_vendor2__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_histitems_histitems__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_map_map__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_register_register__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_oneitem_oneitem__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_multiple_multiple__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_payments_payments__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_myaccount_myaccount__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_enter_credit_card_enter_credit_card__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_enter_address_enter_address__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_email_login_email_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_choose_address_choose_address__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_shipping_shipping__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_stripe__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_geolocation__ = __webpack_require__(223);
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
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_main_main__["a" /* MainPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_oneitem_oneitem__["a" /* OneitemPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_multiple_multiple__["a" /* MultiplePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_tandc_tandc__["a" /* TandcPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_tandc2_tandc2__["a" /* Tandc2Page */],
            __WEBPACK_IMPORTED_MODULE_22__pages_vendorterms_vendorterms__["a" /* VendortermsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_vendor2_vendor2__["a" /* Vendor2Page */],
            __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_myaccount_myaccount__["a" /* MyaccountPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_handy_handy__["a" /* HandyPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_concern_concern__["a" /* ConcernPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_conversation_conversation__["a" /* ConversationPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_specials_specials__["a" /* SpecialsPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_histitems_histitems__["a" /* HistitemsPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_payments_payments__["a" /* PaymentsPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_shipping_shipping__["a" /* ShippingPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_choose_address_choose_address__["a" /* ChooseAddressPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_enter_address_enter_address__["a" /* EnterAddressPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_email_login_email_login__["a" /* EmailLoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/oneitem/oneitem.module#OneitemPageModule', name: 'OneitemPage', segment: 'oneitem', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/multiple/multiple.module#MultiplePageModule', name: 'MultiplePage', segment: 'multiple', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/account/account.module#AccountPageModule', name: 'AccountPage', segment: 'account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/specials/specials.module#SpecialsPageModule', name: 'SpecialsPage', segment: 'specials', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/enter-address/enter-address.module#EnterAddressPageModule', name: 'EnterAddressPage', segment: 'enter-address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/address/address.module#AddressPageModule', name: 'AddressPage', segment: 'address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/conversation/conversation.module#ConversationPageModule', name: 'ConversationPage', segment: 'conversation', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/concern/concern.module#ConcernPageModule', name: 'ConcernPage', segment: 'concern', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/tandc/tandc.module#TandcPageModule', name: 'TandcPage', segment: 'tandc', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/email-login/email-login.module#EmailLoginPageModule', name: 'EmailLoginPage', segment: 'email-login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/enter-credit-card/enter-credit-card.module#EnterCreditCardPageModule', name: 'EnterCreditCardPage', segment: 'enter-credit-card', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/vendor2/vendor2.module#Vendor2PageModule', name: 'Vendor2Page', segment: 'vendor2', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/vendorterms/vendorterms.module#VendortermsPageModule', name: 'VendortermsPage', segment: 'vendorterms', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/checkout/checkout.module#CheckoutPageModule', name: 'CheckoutPage', segment: 'checkout', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/payments/payments.module#PaymentsPageModule', name: 'PaymentsPage', segment: 'payments', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/shipping/shipping.module#ShippingPageModule', name: 'ShippingPage', segment: 'shipping', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/choose-address/choose-address.module#ChooseAddressPageModule', name: 'ChooseAddressPage', segment: 'choose-address', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/push/push.module#PushPageModule', name: 'PushPage', segment: 'push', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_main_main__["a" /* MainPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_oneitem_oneitem__["a" /* OneitemPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_multiple_multiple__["a" /* MultiplePage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_payments_payments__["a" /* PaymentsPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_histitems_histitems__["a" /* HistitemsPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_tandc_tandc__["a" /* TandcPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_tandc2_tandc2__["a" /* Tandc2Page */],
            __WEBPACK_IMPORTED_MODULE_22__pages_vendorterms_vendorterms__["a" /* VendortermsPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_vendor2_vendor2__["a" /* Vendor2Page */],
            __WEBPACK_IMPORTED_MODULE_14__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_handy_handy__["a" /* HandyPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_concern_concern__["a" /* ConcernPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_conversation_conversation__["a" /* ConversationPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_specials_specials__["a" /* SpecialsPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_myaccount_myaccount__["a" /* MyaccountPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_enter_address_enter_address__["a" /* EnterAddressPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_shipping_shipping__["a" /* ShippingPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_choose_address_choose_address__["a" /* ChooseAddressPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_email_login_email_login__["a" /* EmailLoginPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_36__providers_connect__["a" /* Connect */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_main_main__ = __webpack_require__(109);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OneitemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
        this.personal = '';
        this.buttonmode = 'Select';
        this.item = this.navParams.get('item');
        this.buttonmode = this.navParams.get('buttonmode');
        this.details = 'Lorem emptor ...';
        this.title = this.item.title;
        this.myPic = this.item.pic;
        this.personal = '';
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
                that.personal = data.personal;
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
            // console.log('adding ' + this.item.id);
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
                nw.unshift("" + this.item.id + "^1^" + this.item.price + "^" + this.item.title + '^' + this.item.company + '^' + this.personal + '^');
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
        selector: 'page-oneitem',template:/*ion-inline-start:"/var/www/html/ionic/login/src/pages/oneitem/oneitem.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>TELLA</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content no-padding>\n<ion-row text-center>\n<ion-col>\n<img [src]="bannerPic" style="width:100%">\n</ion-col>\n</ion-row>\n\n<ion-row text-center>\n<ion-col col-2>\n</ion-col>\n<ion-col col-8>\n<img [src]="myPic" style = "border:1px solid gainsboro">\n</ion-col>\n<ion-col col-2>\n</ion-col>\n</ion-row>\n<ion-item padding text-wrap no-lines>\n<div style="font-weight:bold">{{ title }}</div>\n<div style="font-weight:bold; margin-top:0px !important">${{ price }}</div>\n<div *ngIf="personal" style="padding-top:10px; color:red; font-weight:bold">This item can be personalised.  Please remember to enter the necessary details</div>\n<p style="margin-top:15px" [innerHTML]="details"></p>\n</ion-item>\n</ion-content>\n<ion-footer *ngIf="buttonmode.length">\n<button ion-button block color="secondary" (click)="addProduct()" style="font-weight:bold!important">{{ buttonmode }}</button>\n</ion-footer>\n\n'/*ion-inline-end:"/var/www/html/ionic/login/src/pages/oneitem/oneitem.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
], OneitemPage);

//# sourceMappingURL=oneitem.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterAddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], EnterAddressPage);

//# sourceMappingURL=enter-address.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TandcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tandc2_tandc2__ = __webpack_require__(173);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], TandcPage);

//# sourceMappingURL=tandc.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], EmailLoginPage);

//# sourceMappingURL=email-login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterCreditCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__ = __webpack_require__(174);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], EnterCreditCardPage);

//# sourceMappingURL=enter-credit-card.js.map

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(172);
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

/***/ })

},[226]);
//# sourceMappingURL=main.js.map