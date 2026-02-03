/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",_=u.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,N=`<${C}>`,P=document,z=()=>P.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,F=/>/g,M=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,R=/"/g,D=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),I=new WeakMap,q=P.createTreeWalker(P,129);function V(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=U;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===U?"!--"===c[1]?o=B:void 0!==c[1]?o=F:void 0!==c[2]?(D.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=M):void 0!==c[3]&&(o=M):o===M?">"===c[0]?(o=r??U,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?M:'"'===c[3]?R:L):o===R||o===L?o=M:o===B||o===F?o=U:(o=M,r=void 0);const h=o===M&&t[e+1].startsWith("/>")?" ":"";n+=o===U?i+N:l>=0?(s.push(a),i.slice(0,l)+k+i.slice(l)+A+h):i+A+(-2===l?e:h)}return[V(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=Z(t,e);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=l[n++],i=s.getAttribute(t).split(A),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(A)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),q.nextNode(),a.push({type:2,index:++r});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)a.push({type:7,index:r}),t+=A.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===j)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=H(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=q.nextNode(),n++)}return q.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),H(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=K(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=K(this,s[i+o],e,o),a===j&&(a=this._$AH[o]),n||=!H(a)||a!==this._$AH[o],a===G?t=G:t!==G&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class it extends Y{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??G)===j)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(J,X),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(z(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;var ct,lt;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ct||(ct={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(lt||(lt={}));var dt=new Set(["call-service","divider","section","weblink","cast","select"]),ht={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},pt=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return s("hui-error-card",{type:"error",error:t,config:e})},s=function(t,e){var s=window.document.createElement(t);try{if(!s.setConfig)return;s.setConfig(e)}catch(s){return console.error(t,s),i(s.message,e)}return s};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var r=t.type;if(r&&r.startsWith("custom:"))r=r.substr(7);else if(e)if(dt.has(r))r="hui-"+r+"-row";else{if(!t.entity)return i("Invalid config given.",t);var n=t.entity.split(".",1)[0];r="hui-"+(ht[n]||"text")+"-entity-row"}else r="hui-"+r+"-card";if(customElements.get(r))return s(r,t);var o=i("Custom element doesn't exist: "+t.type+".",t);o.style.display="None";var a=setTimeout(function(){o.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(a),function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});r.detail=i,t.dispatchEvent(r)}(o,"ll-rebuild",{},o)}),o};customElements.define("thz-card-editor",class extends ot{static get properties(){return{hass:{type:Object},config:{type:Object},_discoveredEntities:{type:Object},_expandedSections:{type:Object},_searchFilter:{type:String}}}constructor(){super(),this._discoveredEntities={},this._expandedSections={},this._searchFilter=""}setConfig(t){this.config=t,this.config.selected_entities||(this.config.selected_entities=this._getEmptySelectedEntities()),this._discoverEntities()}render(){return this.hass&&this.config?W`
      <div class="card-config">
        <div class="info-box">
          <div class="info-title">ℹ️ Auto-Discovery</div>
          <div class="info-text">
            This card automatically discovers THZ/Tecalor/LWZ heat pump entities.
            If auto-discovery doesn't work, specify a device or entity filter below.
          </div>
        </div>

        <div class="option">
          <label for="device">Device (optional - for manual selection)</label>
          <ha-device-picker
            id="device"
            .hass=${this.hass}
            .value=${this.config.device_id||""}
            @value-changed=${this._deviceChanged}
            allow-custom-entity>
          </ha-device-picker>
        </div>

        <div class="option">
          <label for="entity_filter">Entity Filter (optional - e.g., "my_heatpump")</label>
          <input
            id="entity_filter"
            type="text"
            .value=${this.config.entity_filter||""}
            @change=${this._entityFilterChanged}
            placeholder="Leave empty for auto-discovery">
        </div>

        <div class="option">
          <label for="name">Card Name</label>
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
              .checked=${!1!==this.config.show_temperature_graph}
              @change=${this._toggleTemperatureGraph}>
            Show Temperature Graph
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_fan_graph}
              @change=${this._toggleFanGraph}>
            Show Fan Graph
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_heating_details_graph}
              @change=${this._toggleHeatingDetailsGraph}>
            Show Heating Details Graph
          </label>
        </div>

        <div class="option">
          <label for="graph_hours">Graph Time Range (hours)</label>
          <input
            id="graph_hours"
            type="number"
            min="1"
            max="168"
            .value=${this.config.graph_hours||24}
            @change=${this._graphHoursChanged}>
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

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_cooling}
              @change=${this._toggleCooling}>
            Show Cooling Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_status}
              @change=${this._toggleStatus}>
            Show Status Badge
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_statistics}
              @change=${this._toggleStatistics}>
            Show Statistics Dashboard
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!1!==this.config.show_energy}
              @change=${this._toggleEnergy}>
            Show Energy & Efficiency Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${!0===this.config.show_errors_always}
              @change=${this._toggleErrorsAlways}>
            Always Show Error Section (even when no errors)
          </label>
        </div>

        <!-- Entity Selection Section -->
        <div class="entity-selection-section">
          <div class="section-header">
            <div class="section-title">🔍 Entity Selection</div>
            <button class="refresh-button" @click=${this._refreshEntities}>
              🔄 Refresh Entity List
            </button>
          </div>
          
          <div class="search-box">
            <input
              type="text"
              placeholder="Search entities..."
              .value=${this._searchFilter}
              @input=${this._handleSearchFilter}>
          </div>

          ${this._renderEntitySection("temperature","🌡️ Temperature Sensors")}
          ${this._renderEntitySection("mode","⚙️ Operation Mode")}
          ${this._renderEntitySection("heating_circuit","🔥 Heating Circuit")}
          ${this._renderEntitySection("hot_water","💧 Hot Water")}
          ${this._renderEntitySection("cooling","❄️ Cooling")}
          ${this._renderEntitySection("additional","➕ Additional Controls")}
        </div>
      </div>
    `:W``}_renderEntitySection(t,e){const i=this._discoveredEntities[t]||[],s=this._filterEntities(i),r=(this.config.selected_entities?.[t]||[]).length,n=i.length,o=this._expandedSections[t];return 0===n?W``:W`
      <div class="entity-section">
        <div class="entity-section-header" @click=${()=>this._toggleSection(t)}>
          <span class="expand-icon">${o?"▼":"▶"}</span>
          <span class="entity-section-title">${e}</span>
          <span class="entity-count">(${r} of ${n} selected)</span>
        </div>
        
        ${o?W`
          <div class="entity-section-content">
            <div class="section-actions">
              <button class="action-button" @click=${e=>this._handleSectionAction(e,()=>this._selectAllInSection(t))}>
                Select All
              </button>
              <button class="action-button" @click=${e=>this._handleSectionAction(e,()=>this._deselectAllInSection(t))}>
                Deselect All
              </button>
            </div>
            
            <div class="entity-list">
              ${0===s.length?W`
                <div class="no-entities">No entities match your search</div>
              `:s.map(e=>this._renderEntityRow(t,e))}
            </div>
          </div>
        `:""}
      </div>
    `}_renderEntityRow(t,e){const i=this._isEntitySelected(t,e),s=this._getEntityIcon(e),r=this._getEntityName(e),n=this._getEntityState(e);return W`
      <div class="entity-row ${i?"selected":""}">
        <label class="entity-label">
          <input
            type="checkbox"
            .checked=${i}
            @change=${()=>this._toggleEntity(t,e)}>
          <span class="entity-icon">${s}</span>
          <span class="entity-info">
            <span class="entity-name">${r}</span>
            <span class="entity-id">${e}</span>
          </span>
          <span class="entity-state">${n}</span>
        </label>
      </div>
    `}_deviceChanged(t){const e={...this.config};e.device_id=t.detail.value,this._updateConfig(e),setTimeout(()=>this._discoverEntities(),100)}_entityFilterChanged(t){const e={...this.config};e.entity_filter=t.target.value,this._updateConfig(e),setTimeout(()=>this._discoverEntities(),100)}_nameChanged(t){const e={...this.config};e.name=t.target.value,this._updateConfig(e)}_toggleTemperature(t){const e={...this.config};e.show_temperature=t.target.checked,this._updateConfig(e)}_toggleTemperatureGraph(t){const e={...this.config};e.show_temperature_graph=t.target.checked,this._updateConfig(e)}_toggleFanGraph(t){const e={...this.config};e.show_fan_graph=t.target.checked,this._updateConfig(e)}_toggleHeatingDetailsGraph(t){const e={...this.config};e.show_heating_details_graph=t.target.checked,this._updateConfig(e)}_graphHoursChanged(t){const e={...this.config},i=parseInt(t.target.value);!isNaN(i)&&i>=1&&i<=168&&(e.graph_hours=i,this._updateConfig(e))}_toggleMode(t){const e={...this.config};e.show_mode=t.target.checked,this._updateConfig(e)}_toggleHeatingCircuit(t){const e={...this.config};e.show_heating_circuit=t.target.checked,this._updateConfig(e)}_toggleHotWater(t){const e={...this.config};e.show_hot_water=t.target.checked,this._updateConfig(e)}_toggleCooling(t){const e={...this.config};e.show_cooling=t.target.checked,this._updateConfig(e)}_toggleStatus(t){const e={...this.config};e.show_status=t.target.checked,this._updateConfig(e)}_toggleStatistics(t){const e={...this.config};e.show_statistics=t.target.checked,this._updateConfig(e)}_toggleEnergy(t){const e={...this.config};e.show_energy=t.target.checked,this._updateConfig(e)}_toggleErrorsAlways(t){const e={...this.config};e.show_errors_always=t.target.checked,this._updateConfig(e)}_updateConfig(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_discoverEntities(){if(!this.hass)return;const t={temperature:[],mode:[],heating_circuit:[],hot_water:[],cooling:[],additional:[]},e=(t,e=null)=>{if(!this.hass)return[];let i=null;return this.config.device_id&&this.hass.devices&&this.hass.entities&&(i=Object.entries(this.hass.entities).filter(([t,e])=>e.device_id===this.config.device_id).map(([t])=>t)),Object.entries(this.hass.states).filter(([s,r])=>{if(!r||!r.attributes)return!1;if(i&&!i.includes(s))return!1;if(this.config.entity_filter&&!s.toLowerCase().includes(this.config.entity_filter.toLowerCase()))return!1;if(!(this.config.entity_filter||this.config.device_id||s.toLowerCase().includes("thz")||s.toLowerCase().includes("tecalor")||s.toLowerCase().includes("lwz")||"thz"===r.attributes.integration||r.attributes.device_class&&JSON.stringify(r.attributes).toLowerCase().includes("thz")))return!1;if(e&&!s.startsWith(e+"."))return!1;const n=s.includes(".")?s.split(".")[1]:s,o=r.attributes.friendly_name||"";return t.test(s)||t.test(n)||t.test(o)}).map(([t])=>t)},i=e(/temperature|temp/i,"sensor");t.temperature=i.filter(t=>!/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(t));const s=e(/mode|betriebsart|operation|operating/i,"select"),r=e(/mode|betriebsart|operation|operating|state|status/i,"sensor");t.mode=[...s,...r];const n=e(/hc1|heating.*circuit.*1|heizkreis.*1/i,"switch"),o=e(/hc1|heating.*circuit.*1|heizkreis.*1/i,"number");t.heating_circuit=[...n,...o];const a=e(/dhw|hot.*water|warmwasser/i,"switch"),c=e(/dhw|hot.*water|warmwasser/i,"number"),l=e(/dhw|hot.*water|warmwasser/i,"sensor");t.hot_water=[...a,...c,...l];const d=e(/cooling|k[üu]hl/i,"switch"),h=e(/cooling|k[üu]hl/i,"number"),p=e(/cooling|k[üu]hl/i,"sensor"),u=e(/cooling|k[üu]hl/i,"select");t.cooling=[...d,...h,...p,...u];const g=e(/emergency|party|holiday|vacation|urlaub/i,"switch");t.additional=g.filter(t=>!/cooling|k[üu]hl/i.test(t)),this._discoveredEntities=t}_getEmptySelectedEntities(){return{temperature:[],mode:[],heating_circuit:[],hot_water:[],cooling:[],additional:[]}}_getEntityDomain(t){return t.split(".")[0]}_getEntityIcon(t){return{sensor:"📊",switch:"🔘",number:"🔢",select:"📋",binary_sensor:"⚫"}[this._getEntityDomain(t)]||"❓"}_getEntityName(t){const e=this.hass.states[t];return e?e.attributes.friendly_name||t.split(".")[1]||"Unknown":t}_getEntityState(t){const e=this.hass.states[t];if(!e)return"unavailable";const i=e.attributes.unit_of_measurement||"";return`${e.state}${i}`}_isEntitySelected(t,e){return this.config.selected_entities?.[t]?.includes(e)||!1}_toggleEntity(t,e){const i={...this.config};i.selected_entities||(i.selected_entities=this._getEmptySelectedEntities());const s=i.selected_entities[t]||[],r=s.indexOf(e);i.selected_entities[t]=-1===r?[...s,e]:s.filter(t=>t!==e),this._updateConfig(i)}_selectAllInSection(t){const e={...this.config};e.selected_entities||(e.selected_entities=this._getEmptySelectedEntities()),e.selected_entities[t]=[...this._discoveredEntities[t]||[]],this._updateConfig(e)}_deselectAllInSection(t){const e={...this.config};e.selected_entities||(e.selected_entities=this._getEmptySelectedEntities()),e.selected_entities[t]=[],this._updateConfig(e)}_handleSectionAction(t,e){t.stopPropagation(),e()}_toggleSection(t){this._expandedSections={...this._expandedSections,[t]:!this._expandedSections[t]},this.requestUpdate()}_refreshEntities(){this._discoverEntities(),this.requestUpdate()}_handleSearchFilter(t){this._searchFilter=t.target.value.toLowerCase(),this.requestUpdate()}_filterEntities(t){return this._searchFilter?t.filter(t=>this._getEntityName(t).toLowerCase().includes(this._searchFilter)||t.toLowerCase().includes(this._searchFilter)):t}static get styles(){return n`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .info-box {
        background: var(--secondary-background-color);
        border-left: 4px solid var(--primary-color);
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .info-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .info-text {
        font-size: 13px;
        color: var(--secondary-text-color);
        line-height: 1.5;
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

      input[type="number"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input[type="number"]:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      ha-entity-picker {
        width: 100%;
      }

      ha-device-picker {
        width: 100%;
      }

      input[type="checkbox"] {
        margin-right: 8px;
      }

      /* Entity Selection Styles */
      .entity-selection-section {
        margin-top: 24px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .refresh-button {
        padding: 8px 16px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: opacity 0.2s;
      }

      .refresh-button:hover {
        opacity: 0.8;
      }

      .search-box {
        margin-bottom: 16px;
      }

      .search-box input {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      .search-box input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .entity-section {
        margin-bottom: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
        background: var(--secondary-background-color);
      }

      .entity-section-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        background: var(--secondary-background-color);
        transition: background 0.2s;
        user-select: none;
      }

      .entity-section-header:hover {
        background: var(--card-background-color);
      }

      .expand-icon {
        margin-right: 8px;
        font-size: 12px;
        transition: transform 0.2s;
      }

      .entity-section-title {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-count {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-left: 8px;
      }

      .entity-section-content {
        padding: 12px 16px;
        background: var(--card-background-color);
      }

      .section-actions {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }

      .action-button {
        padding: 6px 12px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.2s;
      }

      .action-button:hover {
        background: var(--primary-color);
        color: white;
      }

      .entity-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .entity-row {
        padding: 8px 12px;
        border-radius: 4px;
        transition: background 0.2s;
      }

      .entity-row:hover {
        background: var(--secondary-background-color);
      }

      .entity-row.selected {
        background: rgba(var(--rgb-primary-color), 0.1);
      }

      .entity-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 100%;
      }

      .entity-icon {
        margin: 0 8px 0 4px;
        font-size: 16px;
      }

      .entity-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .entity-name {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .entity-id {
        font-size: 11px;
        color: var(--secondary-text-color);
        font-family: monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .entity-state {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-left: 12px;
        white-space: nowrap;
      }

      .no-entities {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
    `}});console.info("%c  THZ-CARD  \n%c  Version 1.2.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"thz-card",name:"THZ Card",description:"A custom card for controlling THZ heat pumps"});customElements.define("thz-card",class extends ot{static get properties(){return{hass:{type:Object},config:{type:Object}}}constructor(){super(),this._graphCards={}}static getConfigElement(){return document.createElement("thz-card-editor")}static getStubConfig(){return{name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,show_cooling:!0,show_status:!0,show_energy:!0,show_statistics:!0,show_errors_always:!1}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,show_cooling:!0,show_status:!0,show_energy:!0,show_statistics:!0,show_errors_always:!1,...t}}getCardSize(){return 5}shouldUpdate(t){return!!this.config}render(){return this.config&&this.hass?W`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.name}</div>
          ${this.config.show_status?this._renderStatusBadge():""}
        </div>
        <div class="card-content">
          ${this.config.show_statistics?this._renderStatistics():""}
          ${this._renderErrorSection()}
          ${this._renderTemperatureSection()}
          ${this._renderFanSection()}
          ${this._renderHeatingDetailsSection()}
          ${this.config.show_energy?this._renderEnergySection():""}
          ${this.config.show_mode?this._renderModeSection():""}
          ${this.config.show_heating_circuit?this._renderHeatingCircuitSection():""}
          ${this.config.show_hot_water?this._renderHotWaterSection():""}
          ${!1!==this.config.show_cooling?this._renderCoolingSection():""}
          ${this._renderAdditionalControls()}
        </div>
      </ha-card>
    `:W``}_renderTemperatureSection(){if(!this.config.show_temperature)return"";const t=this._getEntitiesForSection("temperature");let e;if(t)e=t;else{e=this._findEntitiesByPattern(/temperature|temp/i,"sensor").filter(t=>!/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(t))}const i=this._getKeyTemperatureSensors(e);return W`
      <div class="section">
        <div class="section-title">Temperatures</div>
        ${this.config.show_temperature_graph&&i.length>0?this._renderTemperatureGraph(i):""}
        <div class="sensor-grid">
          ${e.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
              <div class="sensor-item">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `}_getKeyTemperatureSensors(t){const e=[{pattern:/room.*temp|raum.*temp|indoor/i,found:null},{pattern:/outside.*temp|outdoor|au[sß]en.*temp|ambient/i,found:null},{pattern:/flow.*temp|vorlauf.*temp|supply/i,found:null},{pattern:/return.*temp|r[üu]cklauf.*temp/i,found:null}];t.forEach(t=>{const i=this.hass.states[t];if(!i)return;const s=(t+" "+(i.attributes.friendly_name||"")).toLowerCase();e.forEach(e=>{!e.found&&e.pattern.test(s)&&(e.found=t)})});const i=e.filter(t=>t.found).map(t=>t.found),s=t.filter(t=>!i.includes(t));return[...i,...s].slice(0,4)}_renderStatusBadge(){const t=this._findEntitiesByPattern(/state|status|mode|betrieb|operation|operating|zustand/i,"sensor");if(0===t.length)return W``;const e=this.hass.states[t[0]];if(!e)return W``;const i=e.state;let s="status-unknown",r="●";return/heat|heating|heizen/i.test(i)?(s="status-heating",r="🔥"):/cool|cooling|kühlen/i.test(i)?(s="status-cooling",r="❄️"):/idle|standby|bereit/i.test(i)?(s="status-idle",r="⏸️"):/defrost|abtau/i.test(i)?(s="status-defrost",r="🌨️"):/off|aus/i.test(i)&&(s="status-off",r="⭕"),W`
      <div class="status-badge ${s}">
        <span class="status-icon">${r}</span>
        <span class="status-text">${i}</span>
      </div>
    `}_renderStatistics(){const t=this._findEntitiesByPattern(/runtime|laufzeit|operating.*time|betriebszeit|hours|stunden/i,"sensor"),e=this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i,"sensor"),i=this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i,"sensor"),s=this._findEntitiesByPattern(/compressor|verdichter|starts|cycles/i,"sensor"),r=[];if(t.length>0){const e=this.hass.states[t[0]];e&&r.push({name:"Runtime",icon:"⏱️",value:e.state,unit:e.attributes.unit_of_measurement||""})}if(e.length>0){const t=this.hass.states[e[0]];t&&r.push({name:"Energy Today",icon:"⚡",value:t.state,unit:t.attributes.unit_of_measurement||""})}if(i.length>0){const t=this.hass.states[i[0]];if(t){const e=parseFloat(t.state);let i="cop-normal";isNaN(e)||(e>=4?i="cop-excellent":e>=3?i="cop-good":e<2&&(i="cop-poor")),r.push({name:"COP",icon:"📊",value:t.state,unit:t.attributes.unit_of_measurement||"",className:i})}}if(s.length>0){const t=this.hass.states[s[0]];t&&r.push({name:"Compressor",icon:"🔧",value:t.state,unit:t.attributes.unit_of_measurement||""})}return 0===r.length?"":W`
      <div class="statistics-section">
        <div class="stats-grid">
          ${r.map(t=>W`
            <div class="stat-item ${t.className||""}">
              <div class="stat-icon">${t.icon}</div>
              <div class="stat-content">
                <div class="stat-name">${t.name}</div>
                <div class="stat-value">${t.value}${t.unit}</div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `}_renderTemperatureGraph(t){const e=t.slice(0,4);return 0===e.length?"":this._renderHistoryGraph(e,`Temperature History (${this.config.graph_hours||24}h)`,"temperature")}_renderHistoryGraph(t,e,i){if(!t||0===t.length)return"";const s=this.config.graph_hours||24,r={type:"history-graph",entities:t.map(t=>{const e=this.hass.states[t];return{entity:t,name:e?this._getEntityName(e):t}}),hours_to_show:s,refresh_interval:0},n=i||t.join(",");this._graphCards[n]||(this._graphCards[n]=pt(r));const o=this._graphCards[n];return o.hass=this.hass,o.setConfig(r),W`
      <div class="history-graph-container">
        <div class="graph-title">${e}</div>
        <div class="graph-card-wrapper">${o}</div>
      </div>
    `}_renderFanSection(){const t=this._findEntitiesByPattern(/fan|l[üu]fter|ventilat|speed|rpm|drehzahl/i,"sensor");return W`
      <div class="section">
        <div class="section-title">Fan Values</div>
        ${this.config.show_fan_graph&&t.length>0?this._renderFanGraph(t):""}
        ${t.length>0?W`
          <div class="sensor-grid">
            ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
                <div class="sensor-item">
                  <div class="sensor-name">${i}</div>
                  <div class="sensor-value">${s}${r}</div>
                </div>
              `})}
          </div>
        `:W`
          <div class="no-data">No fan sensors found</div>
        `}
      </div>
    `}_renderFanGraph(t){const e=t.slice(0,4);return 0===e.length?"":this._renderHistoryGraph(e,`Fan History (${this.config.graph_hours||24}h)`,"fan")}_renderHeatingDetailsSection(){const t=this._findEntitiesByPattern(/booster|pump|circuit.*pump|power|integral|heizleistung|leistung|compressor|verdichter|stage|stufe/i,"sensor").filter(t=>{const e=t.toLowerCase();return!/total.*energy|daily.*energy|temperature|temp/.test(e)});return W`
      <div class="section">
        <div class="section-title">Heating Details</div>
        ${this.config.show_heating_details_graph&&t.length>0?this._renderHeatingDetailsGraph(t):""}
        ${t.length>0?W`
          <div class="sensor-grid">
            ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
                <div class="sensor-item">
                  <div class="sensor-name">${i}</div>
                  <div class="sensor-value">${s}${r}</div>
                </div>
              `})}
          </div>
        `:W`
          <div class="no-data">No heating detail sensors found</div>
        `}
      </div>
    `}_renderEnergySection(){const t=this._findEntitiesByPattern(/power|leistung|watt|kw/i,"sensor"),e=this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i,"sensor"),i=this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i,"sensor"),s=[...new Set([...t,...e,...i])];return 0===s.length?"":W`
      <div class="section">
        <div class="section-title">⚡ Energy & Efficiency</div>
        <div class="sensor-grid">
          ${s.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";let n="sensor-item";if(/cop|efficiency|wirkungsgrad/i.test(i)){const t=parseFloat(s);isNaN(t)||(t>=4?n+=" cop-excellent":t>=3?n+=" cop-good":t<2&&(n+=" cop-poor"))}return W`
              <div class="${n}">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `}_renderHeatingDetailsGraph(t){const e=t.slice(0,4);return 0===e.length?"":this._renderHistoryGraph(e,`Heating Details History (${this.config.graph_hours||24}h)`,"heating-details")}_renderModeSection(){const t=this._getEntitiesForSection("mode");let e,i;return t?(e=t.filter(t=>t.startsWith("select.")),i=t.filter(t=>t.startsWith("sensor."))):(e=this._findEntitiesByPattern(/mode|betriebsart|operation|operating/i,"select"),i=this._findEntitiesByPattern(/mode|betriebsart|operation|operating|state|status/i,"sensor")),W`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        ${e.length>0?W`
          <div class="control-grid">
            ${e.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.options||[];return W`
                <div class="control-item">
                  <div class="control-name">${i}</div>
                  <select 
                    @change=${e=>this._handleSelectChange(t,e.target.value)}
                    .value=${s}>
                    ${r.map(t=>W`
                      <option value="${t}" ?selected=${t===s}>
                        ${t}
                      </option>
                    `)}
                  </select>
                </div>
              `})}
          </div>
        `:""}
        ${i.length>0?W`
          <div class="sensor-grid" style="margin-top: ${e.length>0?"12px":"0"}">
            ${i.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
                <div class="sensor-item">
                  <div class="sensor-name">${i}</div>
                  <div class="sensor-value">${s}${r}</div>
                </div>
              `})}
          </div>
        `:""}
        ${0===e.length&&0===i.length?W`
          <div class="no-data">No operation mode controls found</div>
        `:""}
      </div>
    `}_renderHeatingCircuitSection(){const t=this._getEntitiesForSection("heating_circuit");let e,i;return t?(e=t.filter(t=>t.startsWith("number.")),i=t.filter(t=>t.startsWith("switch."))):(e=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"number"),i=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"switch")),W`
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
          ${e.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.min||0,n=e.attributes.max||100,o=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${r}
                    max=${n}
                    step=${o}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderHotWaterSection(){const t=this._getEntitiesForSection("hot_water");let e,i,s;return t?(e=t.filter(t=>t.startsWith("switch.")),i=t.filter(t=>t.startsWith("number.")),s=t.filter(t=>t.startsWith("sensor."))):(e=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"switch"),i=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"number"),s=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"sensor")),W`
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
          ${i.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.min||0,n=e.attributes.max||100,o=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${r}
                    max=${n}
                    step=${o}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
        ${s.length>0?W`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${s.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
                <div class="sensor-item">
                  <div class="sensor-name">${i}</div>
                  <div class="sensor-value">${s}${r}</div>
                </div>
              `})}
          </div>
        `:""}
      </div>
    `}_renderCoolingSection(){const t=this._getEntitiesForSection("cooling");let e,i,s,r;return t?(e=t.filter(t=>t.startsWith("switch.")),i=t.filter(t=>t.startsWith("number.")),s=t.filter(t=>t.startsWith("sensor.")),r=t.filter(t=>t.startsWith("select."))):(e=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"switch"),i=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"number"),s=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"sensor"),r=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"select")),0===e.length&&0===i.length&&0===s.length&&0===r.length?"":W`
      <div class="section cooling-section">
        <div class="section-title">❄️ Cooling</div>
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
          ${r.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.options||[];return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <select 
                  @change=${e=>this._handleSelectChange(t,e.target.value)}
                  .value=${s}>
                  ${r.map(t=>W`
                    <option value="${t}" ?selected=${t===s}>
                      ${t}
                    </option>
                  `)}
                </select>
              </div>
            `})}
          ${i.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.min||0,n=e.attributes.max||100,o=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return W`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${r}
                    max=${n}
                    step=${o}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
        ${s.length>0?W`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${s.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return W`
                <div class="sensor-item">
                  <div class="sensor-name">${i}</div>
                  <div class="sensor-value">${s}${r}</div>
                </div>
              `})}
          </div>
        `:""}
      </div>
    `}_renderAdditionalControls(){const t=this._getEntitiesForSection("additional");let e;if(t)e=t;else{e=this._findEntitiesByPattern(/emergency|party|holiday|vacation|urlaub/i,"switch").filter(t=>!/cooling|k[üu]hl/i.test(t))}return 0===e.length?"":W`
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
    `}_renderErrorSection(){const t=/error|alarm|fault|fehler|st[öo]rung|warnung/i,e=[...this._findEntitiesByPattern(t,"sensor"),...this._findEntitiesByPattern(t,"binary_sensor")];if(0===e.length)return"";const i=e.filter(t=>{const e=this.hass.states[t];return!!e&&this._isErrorState(e.state)});if(0===i.length&&!this.config.show_errors_always)return"";const s=i.length>0;return W`
      <div class="section error-section ${s?"has-errors":""}">
        <div class="section-title">
          ${s?"⚠️ Alerts & Errors":"✓ System Status"}
        </div>
        ${s?W`
          <div class="error-list">
            ${i.map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state;return W`
                <div class="error-item">
                  <div class="error-icon">⚠️</div>
                  <div class="error-content">
                    <div class="error-name">${i}</div>
                    <div class="error-value">${s}</div>
                  </div>
                </div>
              `})}
          </div>
        `:W`
          <div class="no-errors">
            <span class="success-icon">✓</span>
            <span>No errors or warnings detected</span>
          </div>
        `}
      </div>
    `}_isErrorState(t){const e=t.toLowerCase();return["on","true","active","problem","alarm","error","fault"].includes(e)}_findEntitiesByPattern(t,e=null){if(!this.hass)return[];let i=null;return this.config.device_id&&this.hass.devices&&this.hass.entities&&(i=Object.entries(this.hass.entities).filter(([t,e])=>e.device_id===this.config.device_id).map(([t])=>t)),Object.entries(this.hass.states).filter(([s,r])=>{if(!r||!r.attributes)return!1;if(i&&!i.includes(s))return!1;if(this.config.entity_filter&&!s.toLowerCase().includes(this.config.entity_filter.toLowerCase()))return!1;if(!(this.config.entity_filter||this.config.device_id||s.toLowerCase().includes("thz")||s.toLowerCase().includes("tecalor")||s.toLowerCase().includes("lwz")||"thz"===r.attributes.integration||r.attributes.device_class&&JSON.stringify(r.attributes).toLowerCase().includes("thz")))return!1;if(e&&!s.startsWith(e+"."))return!1;const n=s.includes(".")?s.split(".")[1]:s,o=r.attributes.friendly_name||"";return t.test(s)||t.test(n)||t.test(o)}).map(([t])=>t)}_getEntitiesForSection(t){return this.config.selected_entities&&this.config.selected_entities[t]&&this.config.selected_entities[t].length>0?this.config.selected_entities[t].filter(t=>void 0!==this.hass.states[t]):null}_getEntityName(t){return t.attributes.friendly_name||t.entity_id?.split?.(".")[1]||"Unknown"}_handleSelectChange(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_handleSwitchToggle(t,e){const i=e?"turn_on":"turn_off";this.hass.callService("switch",i,{entity_id:t})}_handleNumberChange(t,e){const i=parseFloat(e);isNaN(i)||this.hass.callService("number","set_value",{entity_id:t,value:i})}static get styles(){return n`
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

      /* Status Badge Styles */
      .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
        border: 2px solid transparent;
      }

      .status-heating {
        background: rgba(255, 87, 34, 0.15);
        border-color: #ff5722;
        color: #ff5722;
      }

      .status-cooling {
        background: rgba(33, 150, 243, 0.15);
        border-color: #2196f3;
        color: #2196f3;
      }

      .status-idle {
        background: rgba(158, 158, 158, 0.15);
        border-color: #9e9e9e;
        color: #9e9e9e;
      }

      .status-defrost {
        background: rgba(3, 169, 244, 0.15);
        border-color: #03a9f4;
        color: #03a9f4;
      }

      .status-off {
        background: rgba(117, 117, 117, 0.15);
        border-color: #757575;
        color: #757575;
      }

      .status-unknown {
        background: rgba(158, 158, 158, 0.15);
        border-color: #9e9e9e;
        color: var(--primary-text-color);
      }

      .status-icon {
        font-size: 16px;
      }

      /* Statistics Section Styles */
      .statistics-section {
        margin-bottom: 20px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .stat-icon {
        font-size: 24px;
        line-height: 1;
      }

      .stat-content {
        flex: 1;
        min-width: 0;
      }

      .stat-name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cop-excellent {
        border-color: #4caf50;
        background: rgba(76, 175, 80, 0.1);
      }

      .cop-excellent .stat-value {
        color: #4caf50;
      }

      .cop-good {
        border-color: #8bc34a;
        background: rgba(139, 195, 74, 0.1);
      }

      .cop-good .stat-value {
        color: #8bc34a;
      }

      .cop-poor {
        border-color: #ff9800;
        background: rgba(255, 152, 0, 0.1);
      }

      .cop-poor .stat-value {
        color: #ff9800;
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

      /* Temperature Graph Styles */
      /* History Graph Container - using HA's built-in history-graph card */
      .history-graph-container {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .history-graph-container .graph-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .history-graph-container hui-history-graph-card {
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
      }

      /* Error Section Styles */
      .error-section {
        border-color: var(--divider-color);
      }

      .error-section.has-errors {
        border-color: #ff9800;
        border-width: 2px;
        background: rgba(255, 152, 0, 0.05);
      }

      .no-errors {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        color: #4caf50;
        font-size: 14px;
        justify-content: center;
        background: rgba(76, 175, 80, 0.05);
        border-radius: 4px;
      }

      .success-icon {
        font-size: 20px;
        font-weight: bold;
      }

      .error-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .error-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        background: rgba(255, 152, 0, 0.1);
        border: 1px solid #ff9800;
        border-radius: 4px;
      }

      .error-icon {
        font-size: 20px;
        line-height: 1;
      }

      .error-content {
        flex: 1;
        min-width: 0;
      }

      .error-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .error-value {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .no-data {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
        font-style: italic;
      }

      .cooling-section {
        border-color: #2196f3;
        background: rgba(33, 150, 243, 0.03);
      }

      @media (max-width: 600px) {
        .sensor-grid,
        .control-grid {
          grid-template-columns: 1fr;
        }
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `}});
//# sourceMappingURL=thz-card.js.map
