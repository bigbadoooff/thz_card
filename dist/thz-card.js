/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=t=>t,x=A.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,H=document,N=()=>H.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,U="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,L=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,q=H.createTreeWalker(H,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=M;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(r.lastIndex=l,c=r.exec(i),null!==c);)l=r.lastIndex,r===M?"!--"===c[1]?r=z:void 0!==c[1]?r=R:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=o??M,h=-1):void 0===c[1]?h=-2:(h=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?D:B):r===D||r===B?r=j:r===z||r===R?r=M:(r=j,o=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===M?i+k:h>=0?(s.push(a),i.slice(0,h)+S+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,h]=J(t,e);if(this.el=K.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[n++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),q.nextNode(),a.push({type:2,index:++o});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===I)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??H).importNode(e,!0);q.currentNode=s;let o=q.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=q.nextNode(),n++)}return q.currentNode=H,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=G(this,s[i+r],e,r),a===I&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends Y{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??F)===I)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(K,X),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(N(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const at=nt.litElementPolyfillSupport;at?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");customElements.define("thz-card-editor",class extends rt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config=t}render(){return this.hass&&this.config?W`
      <div class="card-config">
        <div class="option">
          <label for="entity">Entity (optional - auto-discover THZ entities)</label>
          <input
            id="entity"
            type="text"
            .value=${this.config.entity||""}
            @change=${this._entityChanged}
            placeholder="Leave empty to auto-discover">
        </div>

        <div class="option">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            .value=${this.config.name||"Heat Pump"}
            @change=${this._nameChanged}>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_temperature}
              @change=${this._toggleTemperature}>
            Show Temperature Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_mode}
              @change=${this._toggleMode}>
            Show Mode Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_heating_circuit}
              @change=${this._toggleHeatingCircuit}>
            Show Heating Circuit Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_hot_water}
              @change=${this._toggleHotWater}>
            Show Hot Water Section
          </label>
        </div>
      </div>
    `:W``}_entityChanged(t){const e={...this.config};e.entity=t.target.value,this._updateConfig(e)}_nameChanged(t){const e={...this.config};e.name=t.target.value,this._updateConfig(e)}_toggleTemperature(t){const e={...this.config};e.show_temperature=t.target.checked,this._updateConfig(e)}_toggleMode(t){const e={...this.config};e.show_mode=t.target.checked,this._updateConfig(e)}_toggleHeatingCircuit(t){const e={...this.config};e.show_heating_circuit=t.target.checked,this._updateConfig(e)}_toggleHotWater(t){const e={...this.config};e.show_hot_water=t.target.checked,this._updateConfig(e)}_updateConfig(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-size: 14px;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .option label {
        display: flex;
        align-items: center;
      }

      input[type="text"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input[type="text"]:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      input[type="checkbox"] {
        margin-right: 8px;
      }
    `}});console.info("%c  THZ-CARD  \n%c  Version 1.0.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"thz-card",name:"THZ Card",description:"A custom card for controlling THZ heat pumps"});customElements.define("thz-card",class extends rt{static get properties(){return{hass:{type:Object},config:{type:Object}}}static getConfigElement(){return document.createElement("thz-card-editor")}static getStubConfig(){return{entity:"",name:"Heat Pump",show_temperature:!0,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={name:"Heat Pump",show_temperature:!0,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,...t}}getCardSize(){return 5}shouldUpdate(t){return!!this.config}render(){if(!this.config||!this.hass)return W``;const t=(this.config.entity?this.hass.states[this.config.entity]:null)||{};return W`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.name}</div>
        </div>
        <div class="card-content">
          ${this._renderTemperatureSection(t)}
          ${this.config.show_mode?this._renderModeSection(t):""}
          ${this.config.show_heating_circuit?this._renderHeatingCircuitSection(t):""}
          ${this.config.show_hot_water?this._renderHotWaterSection(t):""}
          ${this._renderAdditionalControls(t)}
        </div>
      </ha-card>
    `}_renderTemperatureSection(t){if(!this.config.show_temperature)return"";const e=this._findEntitiesByPattern(/temperature|temp/i);return W`
      <div class="section">
        <div class="section-title">Temperatures</div>
        <div class="sensor-grid">
          ${e.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,o=e.attributes.unit_of_measurement||"";return W`
              <div class="sensor-item">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${o}</div>
              </div>
            `})}
        </div>
      </div>
    `}_renderModeSection(t){const e=this._findEntitiesByPattern(/mode|betriebsart/i,"select");return W`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        <div class="control-grid">
          ${e.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,o=e.attributes.options||[];return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <select 
                  @change=${e=>this._handleSelectChange(t,e.target.value)}
                  .value=${s}>
                  ${o.map(t=>W`
                    <option value="${t}" ?selected=${t===s}>
                      ${t}
                    </option>
                  `)}
                </select>
              </div>
            `})}
        </div>
      </div>
    `}_renderHeatingCircuitSection(t){const e=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"number"),i=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"switch");return W`
      <div class="section">
        <div class="section-title">Heating Circuit 1</div>
        <div class="control-grid">
          ${i.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <button 
                  class="switch-button ${s?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!s)}>
                  ${s?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${e.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,o=e.attributes.min||0,n=e.attributes.max||100,r=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${o}
                    max=${n}
                    step=${r}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderHotWaterSection(t){const e=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"switch"),i=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"number");return W`
      <div class="section">
        <div class="section-title">Hot Water</div>
        <div class="control-grid">
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <button 
                  class="switch-button ${s?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!s)}>
                  ${s?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${i.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,o=e.attributes.min||0,n=e.attributes.max||100,r=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${o}
                    max=${n}
                    step=${r}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderAdditionalControls(t){const e=this._findEntitiesByPattern(/cooling|emergency|party|holiday/i,"switch");return 0===e.length?"":W`
      <div class="section">
        <div class="section-title">Additional Controls</div>
        <div class="control-grid">
          ${e.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <button 
                  class="switch-button ${s?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!s)}>
                  ${s?"ON":"OFF"}
                </button>
              </div>
            `})}
        </div>
      </div>
    `}_findEntitiesByPattern(t,e=null){return this.hass?Object.entries(this.hass.states).filter(([i,s])=>{if(!s||!s.attributes)return!1;return!(!i.includes("thz")&&"thz"!==s.attributes.integration)&&(!(e&&!i.startsWith(e+"."))&&(t.test(i)||t.test(s.attributes.friendly_name||"")))}).map(([t])=>t):[]}_getEntityName(t){return t.attributes.friendly_name||t.entity_id?.split?.(".")[1]||"Unknown"}_handleSelectChange(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_handleSwitchToggle(t,e){const i=e?"turn_on":"turn_off";this.hass.callService("switch",i,{entity_id:t})}_handleNumberChange(t,e){const i=parseFloat(e);isNaN(i)||this.hass.callService("number","set_value",{entity_id:t,value:i})}static get styles(){return n`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }

      .name {
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .section {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 12px;
        background: var(--card-background-color);
      }

      .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .sensor-grid,
      .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }

      .sensor-item {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 4px;
      }

      .sensor-name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .sensor-value {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .control-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .control-name {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        cursor: pointer;
      }

      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .switch-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .switch-button.on {
        background: var(--primary-color);
        color: white;
      }

      .switch-button.off {
        background: var(--disabled-text-color);
        color: white;
      }

      .switch-button:hover {
        opacity: 0.8;
      }

      .number-control {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .number-control input {
        flex: 1;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .number-control input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .unit {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      @media (max-width: 600px) {
        .sensor-grid,
        .control-grid {
          grid-template-columns: 1fr;
        }
      }
    `}});
//# sourceMappingURL=thz-card.js.map
