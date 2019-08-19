/*
Copyright (c) [2019] [Annlix]
[ModalJs] is licensed under the Mulan PSL v1.
You can use this software according to the terms and conditions of the Mulan PSL v1.
You may obtain a copy of Mulan PSL v1 at:
    http://license.coscl.org.cn/MulanPSL
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR
PURPOSE.
See the Mulan PSL v1 for more details.
 */

class modal{
    show(params={title:"查看",content:`<p>内容</p>`,close:true,shadow:"black",btn:["确定","关闭"]}){
        let title = this.empty(params.title) ? "查看" : params.title;
        let content = this.empty(params.content) ? `<p>这是内容</p>` : params.content;
        let close = this.empty(params.close) ? true : false;
        let btn = this.empty(params.btn) ? ["查看","关闭"] : params.btn;
        let instanceId = "ModalJs_"+this.getRandStr(6);
        let maxZidx = this.getMaxZIndex();
        let shadow;
        let dom = document.createElement("div");
        dom.setAttribute("id",instanceId);
        dom.className = "__modaljsinstance__";
        dom.style.position = "fixed";
        dom.style.zIndex = maxZidx + 1;
        dom.style.top = 0;
        dom.style.left = 0;
        dom.style.width = "100%";
        dom.style.height = "100vh";

        //按钮组开始
        let btnHtml = "";
        btn.map((item,index) => {
            //先注册全局方法
            let fn;
            if (!this.empty(params.btn1)){
                fn = params.btn1;
            }else{
                fn = () => {
                    __MODAL__.hide();
                }
            }
            let methodName = "modaljs"+this.getRandStr(4);
            window[methodName] = fn;
            // 一般这里是确定按钮
            if(index == 0){
                btnHtml += `<button onclick="${methodName}()" style="border: none;background: linear-gradient(60deg,#2f9688,#4fc08d);height: 32px;padding: 0 15px;margin-right: 8px;border-radius: 2px;color: #eee;cursor: pointer">${item}</button>`
            }else if(index == 1){
                btnHtml += `<button onclick="${methodName}()" style="border: none;background: #cccccc;height: 32px;padding: 0 15px;margin-right: 8px;border-radius: 2px;color: #101010;cursor: pointer">${item}</button>`
            }else{
                btnHtml += `<button onclick="${methodName}()" style="border: none;background: #5b86e5;height: 32px;padding: 0 15px;margin-right: 8px;border-radius: 2px;color: #eee;cursor: pointer">${item}</button>`
            }
        });
        //按钮组结束

        if(this.empty(params.shadow)){
            shadow = "black";
        }else{
            shadow = params.shadow;
        }
        let shadowHtml = "";
        if (shadow){
            if (shadow == "black"){
                shadowHtml = `<div style="z-index:${maxZidx + 2};background: rgba(0,0,0,.6);width: 100%;height: 100vh;position: fixed;top: 0;left: 0"></div>`;
            }else{
                shadowHtml = `<div style="z-index:${maxZidx + 2};background: rgba(255,255,255,.6);width: 100%;height: 100vh;position: fixed;top: 0;left: 0"></div>`;
            }
        }
        let html = `
        ${shadowHtml}
        <div style="max-width: 100%;max-height: 100vh;min-width: 500px;min-height: 300px;background: #ffffff;z-index: ${maxZidx + 3};position:absolute;left: 50%;top:50%;transform: translateX(-50%) translateY(-50%)">
            <!-- Title Bar Start -->
            <div style="height: 30px;width: 100%;background: linear-gradient(60deg,#2f9688,#4fc08d);line-height: 30px;color: #ffffff">
                <div style="display: inline-block;padding: 0 8px;font-size: 0.9em; float: left">${title}</div>
                <div style="display: inline-block;float: right;padding: 0 8px">
                    <svg style="width: 1em;height: 1em" t="1566199783483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1968" width="200" height="200"><path d="M645.44 512l200.14-200.14c24.56-24.56 24.56-64.38 0-88.96l-44.48-44.48c-24.56-24.56-64.38-24.56-88.96 0L512 378.56 311.86 178.42c-24.56-24.56-64.38-24.56-88.96 0L178.42 222.9c-24.56 24.56-24.56 64.38 0 88.96L378.56 512 178.42 712.14c-24.56 24.56-24.56 64.38 0 88.96l44.48 44.48c24.56 24.56 64.4 24.56 88.96 0L512 645.44l200.14 200.14c24.56 24.56 64.4 24.56 88.96 0l44.48-44.48c24.56-24.56 24.56-64.38 0-88.96L645.44 512z" fill="#333333" p-id="1969"></path></svg>
                </div>
                <div style="clear: both"></div>
            </div>
            <!-- Title Bar End -->
            <!-- Content Start -->
            <div style="width: 100%;height: auto;max-height: calc(100vh - 80px);min-height: 220px;overflow-y: auto">
                ${content}
            </div>
            <!-- Content End -->
            <!-- Foot Start -->
            <div style="height: 49px;border-top: 1px solid #ddd;text-align: right;line-height: 49px">
                ${btnHtml}
            </div>
            <!-- Footer End -->
        </div>
        `;

        dom.innerHTML = html;
        document.body.appendChild(dom);
        return dom;
    }
    hide(){
        if(this.empty(arguments[0])){
            [...document.getElementsByClassName("__modaljsinstance__")].map(item => {
                document.body.removeChild(item);
            });
        }else{
            document.body.removeChild(arguments[0]);
        }
    }
    empty(data){
        return data == null || data == [] || data == "" || data == undefined || data == "undefined" || (data.__proto__.constructor == Array && data.length == 0) || (data.__proto__.constructor == Object && JSON.stringify(data) == "{}")
    }
    getRandStr(){
        let length = this.empty(arguments[0]) ? 16 : arguments[0];
        let pool = "abcdefghijklmnopqrstuvwxyz0123456789";
        let str = "";
        for (let i = 0; i < length; i++){
            str += pool[Math.floor(Math.random() * pool.length)];
        }
        return str;
    }
    getMaxZIndex(){
        let eleArr = [...document.all].map(e=> +window.getComputedStyle(e).zIndex || 0);
        return eleArr.length ? Math.max(...eleArr) : 0;
    }

}
var __MODAL__ = new modal();