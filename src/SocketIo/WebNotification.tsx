
import utilFile = require("01core/Util");

export namespace WebNotification {

    export class Notification {

        public static  fun_Notification(title: string, msg: string) {
            var Notification = window["Notification"] || window["mozNotification"] || window["webkitNotification"];

            if (Notification && Notification.permission === "granted") {
                var instance = new Notification(
                    title, {
                        body: msg,
                        icon: "image_url"
                    }
                );

                instance.onclick = function () {
                    // Something to do
                };
                instance.onerror = function () {
                    // Something to do
                };
                instance.onshow = function () {
                    // Something to do
                    // console.log(instance.close);
                    setTimeout(instance.close, 3000);
                };
                instance.onclose = function () {
                    // Something to do
                };
            } else if (Notification && Notification.permission !== "denied") {
                Notification.requestPermission(function (status) {
                    if (Notification.permission !== status) {
                        Notification.permission = status;
                    }
                    // If the user said okay
                    if (status === "granted") {
                        var instance = new Notification(
                            title, {
                                body: msg,
                                icon: "image_url"
                            }
                        );

                        instance.onclick = function () {
                            // Something to do
                        };
                        instance.onerror = function () {
                            // Something to do
                        };
                        instance.onshow = function () {
                            // Something to do
                            setTimeout(instance.close, 3000);
                        };
                        instance.onclose = function () {
                            // Something to do
                        };

                    } else {
                        return false
                    }
                });
            } else {
                return false;
            }

        }

    }
}




