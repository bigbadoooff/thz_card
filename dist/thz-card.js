/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,_=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,v=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[v("elementProperties")]=new Map,b[v("finalized")]=new Map,f?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,H=`<${k}>`,P=document,N=()=>P.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,D="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,U=/>/g,R=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),W=new WeakMap,V=P.createTreeWalker(P,129);function q(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=M;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===M?"!--"===c[1]?n=z:void 0!==c[1]?n=U:void 0!==c[2]?(j.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=R):void 0!==c[3]&&(n=R):n===R?">"===c[0]?(n=r??M,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?R:'"'===c[3]?L:F):n===L||n===F?n=R:n===z||n===U?n=M:(n=R,r=void 0);const d=n===R&&t[e+1].startsWith("/>")?" ":"";o+=n===M?i+H:h>=0?(s.push(a),i.slice(0,h)+S+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,h]=Z(t,e);if(this.el=J.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),V.nextNode(),a.push({type:2,index:++r});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===G)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let r=V.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),T(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=K(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=K(this,s[i+n],e,n),a===G&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===I?t=I:t!==I&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??I)===G)return;const i=this._$AH,s=t===I&&i!==I||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==I&&(i===I||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(J,Q),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(N(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");customElements.define("thz-card-editor",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config=t}render(){return this.hass&&this.config?B`
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
      </div>
    `:B``}_deviceChanged(t){const e={...this.config};e.device_id=t.detail.value,this._updateConfig(e)}_entityFilterChanged(t){const e={...this.config};e.entity_filter=t.target.value,this._updateConfig(e)}_nameChanged(t){const e={...this.config};e.name=t.target.value,this._updateConfig(e)}_toggleTemperature(t){const e={...this.config};e.show_temperature=t.target.checked,this._updateConfig(e)}_toggleTemperatureGraph(t){const e={...this.config};e.show_temperature_graph=t.target.checked,this._updateConfig(e)}_toggleFanGraph(t){const e={...this.config};e.show_fan_graph=t.target.checked,this._updateConfig(e)}_toggleHeatingDetailsGraph(t){const e={...this.config};e.show_heating_details_graph=t.target.checked,this._updateConfig(e)}_graphHoursChanged(t){const e={...this.config},i=parseInt(t.target.value);!isNaN(i)&&i>=1&&i<=168&&(e.graph_hours=i,this._updateConfig(e))}_toggleMode(t){const e={...this.config};e.show_mode=t.target.checked,this._updateConfig(e)}_toggleHeatingCircuit(t){const e={...this.config};e.show_heating_circuit=t.target.checked,this._updateConfig(e)}_toggleHotWater(t){const e={...this.config};e.show_hot_water=t.target.checked,this._updateConfig(e)}_updateConfig(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}static get styles(){return o`
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
    `}});console.info("%c  THZ-CARD  \n%c  Version 1.0.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"thz-card",name:"THZ Card",description:"A custom card for controlling THZ heat pumps"});customElements.define("thz-card",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},_historyData:{type:Object}}}constructor(){super(),this._historyData={},this._loadingHistory=!1}static getConfigElement(){return document.createElement("thz-card-editor")}static getStubConfig(){return{name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,...t}}getCardSize(){return 5}shouldUpdate(t){return!!this.config}render(){return this.config&&this.hass?B`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.name}</div>
        </div>
        <div class="card-content">
          ${this._renderTemperatureSection()}
          ${this._renderFanSection()}
          ${this._renderHeatingDetailsSection()}
          ${this.config.show_mode?this._renderModeSection():""}
          ${this.config.show_heating_circuit?this._renderHeatingCircuitSection():""}
          ${this.config.show_hot_water?this._renderHotWaterSection():""}
          ${this._renderAdditionalControls()}
        </div>
      </ha-card>
    `:B``}_renderTemperatureSection(){if(!this.config.show_temperature)return"";const t=this._findEntitiesByPattern(/temperature|temp/i);return B`
      <div class="section">
        <div class="section-title">Temperatures</div>
        ${this.config.show_temperature_graph&&t.length>0?this._renderTemperatureGraph(t):""}
        <div class="sensor-grid">
          ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return B`
              <div class="sensor-item">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `}_renderTemperatureGraph(t){const e=t.slice(0,4);if(0===e.length)return"";this._historyData[e[0]]||this._loadHistoryData(e);const i=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24"];return B`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Temperature History (${this.config.graph_hours||24}h)</div>
          <button 
            class="refresh-button" 
            @click=${()=>this._loadHistoryData(e)}
            title="Refresh graph data">
            ↻
          </button>
        </div>
        <div class="graph-legend">
          ${e.map((t,e)=>{const s=this.hass.states[t];if(!s)return"";const r=this._getEntityName(s);return B`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${i[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,i)}
      </div>
    `}_renderGraph(t,e){const i=10,s=40,r=100-s-10,o=200-i-20;if(!t.some(t=>this._historyData[t]&&this._historyData[t].length>0))return B`
        <div class="graph-loading">
          Loading graph data...
        </div>
      `;let n=1/0,a=-1/0,c=1/0,h=-1/0;if(t.forEach(t=>{(this._historyData[t]||[]).forEach(t=>{const e=parseFloat(t.state);isNaN(e)||(n=Math.min(n,e),a=Math.max(a,e));const i=new Date(t.last_changed).getTime();c=Math.min(c,i),h=Math.max(h,i)})}),!isFinite(n)||!isFinite(a))return B`
        <div class="graph-loading">
          No temperature data available
        </div>
      `;if(n===a)n-=1,a+=1;else{const t=a-n;n=Math.floor(n-.1*t),a=Math.ceil(a+.1*t)}const l=[];for(let t=0;t<=5;t++){const e=n+t/5*(a-n),i=o-t/5*o;l.push({temp:e.toFixed(1),y:i})}const d=t.map((t,i)=>{const s=this._historyData[t]||[];if(0===s.length)return null;const l=s.map(t=>{const e=parseFloat(t.state);if(isNaN(e))return null;return{x:(new Date(t.last_changed).getTime()-c)/(h-c)*r,y:o-(e-n)/(a-n)*o}}).filter(t=>null!==t);if(0===l.length)return null;const d=l.map((t,e)=>`${0===e?"M":"L"} ${t.x} ${t.y}`).join(" ");return{path:d,color:e[i]}}).filter(t=>null!==t);return B`
      <svg class="graph-svg" viewBox="0 0 100 ${200}" preserveAspectRatio="none">
        <!-- Y-axis labels -->
        <g class="y-axis">
          ${l.map(t=>B`
            <text 
              x="${s-5}" 
              y="${i+t.y}" 
              class="axis-label"
              text-anchor="end"
              alignment-baseline="middle">
              ${t.temp}
            </text>
            <line 
              x1="${s}" 
              y1="${i+t.y}" 
              x2="${s+r}" 
              y2="${i+t.y}" 
              class="grid-line" />
          `)}
        </g>
        
        <!-- Graph area -->
        <g class="graph-area" transform="translate(${s}, ${i})">
          ${d.map(t=>B`
            <path 
              d="${t.path}" 
              fill="none" 
              stroke="${t.color}" 
              stroke-width="0.5" 
              vector-effect="non-scaling-stroke" />
          `)}
        </g>
      </svg>
    `}async _loadHistoryData(t){if(this._loadingHistory)return;this._loadingHistory=!0;const e=this.config.graph_hours||24,i=new Date,s=new Date(i.getTime()-60*e*60*1e3);try{const e=t.map(async t=>{try{const e=await this.hass.callWS({type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),entity_ids:[t],minimal_response:!0,significant_changes_only:!1});e&&e[0]&&(this._historyData[t]=e[0])}catch(e){console.error(`Failed to load history for ${t}:`,e),this._historyData[t]=[]}});await Promise.all(e),this.requestUpdate()}catch(t){console.error("Failed to load history data:",t)}finally{this._loadingHistory=!1}}_renderFanSection(){const t=this._findEntitiesByPattern(/fan|l[üu]fter|ventilat/i,"sensor");return 0!==t.length||this.config.show_fan_graph?B`
      <div class="section">
        <div class="section-title">Fan Values</div>
        ${this.config.show_fan_graph&&t.length>0?this._renderFanGraph(t):""}
        <div class="sensor-grid">
          ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return B`
              <div class="sensor-item">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `:""}_renderFanGraph(t){const e=t.slice(0,4);if(0===e.length)return"";this._historyData[e[0]]||this._loadHistoryData(e);const i=["#9b59b6","#3498db","#1abc9c","#f39c12"];return B`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Fan History (${this.config.graph_hours||24}h)</div>
          <button 
            class="refresh-button" 
            @click=${()=>this._loadHistoryData(e)}
            title="Refresh graph data">
            ↻
          </button>
        </div>
        <div class="graph-legend">
          ${e.map((t,e)=>{const s=this.hass.states[t];if(!s)return"";const r=this._getEntityName(s);return B`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${i[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,i)}
      </div>
    `}_renderHeatingDetailsSection(){const t=this._findEntitiesByPattern(/booster|pump|power|integral|heizleistung|leistung/i,"sensor");return 0!==t.length||this.config.show_heating_details_graph?B`
      <div class="section">
        <div class="section-title">Heating Details</div>
        ${this.config.show_heating_details_graph&&t.length>0?this._renderHeatingDetailsGraph(t):""}
        <div class="sensor-grid">
          ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.unit_of_measurement||"";return B`
              <div class="sensor-item">
                <div class="sensor-name">${i}</div>
                <div class="sensor-value">${s}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `:""}_renderHeatingDetailsGraph(t){const e=t.slice(0,4);if(0===e.length)return"";this._historyData[e[0]]||this._loadHistoryData(e);const i=["#e74c3c","#e67e22","#16a085","#2ecc71"];return B`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Heating Details History (${this.config.graph_hours||24}h)</div>
          <button 
            class="refresh-button" 
            @click=${()=>this._loadHistoryData(e)}
            title="Refresh graph data">
            ↻
          </button>
        </div>
        <div class="graph-legend">
          ${e.map((t,e)=>{const s=this.hass.states[t];if(!s)return"";const r=this._getEntityName(s);return B`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${i[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,i)}
      </div>
    `}_renderModeSection(){const t=this._findEntitiesByPattern(/mode|betriebsart/i,"select");return B`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        <div class="control-grid">
          ${t.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.options||[];return B`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <select 
                  @change=${e=>this._handleSelectChange(t,e.target.value)}
                  .value=${s}>
                  ${r.map(t=>B`
                    <option value="${t}" ?selected=${t===s}>
                      ${t}
                    </option>
                  `)}
                </select>
              </div>
            `})}
        </div>
      </div>
    `}_renderHeatingCircuitSection(){const t=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"number"),e=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"switch");return B`
      <div class="section">
        <div class="section-title">Heating Circuit 1</div>
        <div class="control-grid">
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return B`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <button 
                  class="switch-button ${s?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!s)}>
                  ${s?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${t.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.min||0,o=e.attributes.max||100,n=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return B`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${r}
                    max=${o}
                    step=${n}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderHotWaterSection(){const t=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"switch"),e=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"number");return B`
      <div class="section">
        <div class="section-title">Hot Water</div>
        <div class="control-grid">
          ${t.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return B`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <button 
                  class="switch-button ${s?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!s)}>
                  ${s?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s=e.state,r=e.attributes.min||0,o=e.attributes.max||100,n=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return B`
              <div class="control-item">
                <div class="control-name">${i}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${s}
                    min=${r}
                    max=${o}
                    step=${n}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
      </div>
    `}_renderAdditionalControls(){const t=this._findEntitiesByPattern(/cooling|emergency|party|holiday/i,"switch");return 0===t.length?"":B`
      <div class="section">
        <div class="section-title">Additional Controls</div>
        <div class="control-grid">
          ${t.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const i=this._getEntityName(e),s="on"===e.state;return B`
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
    `}_findEntitiesByPattern(t,e=null){if(!this.hass)return[];let i=null;return this.config.device_id&&this.hass.devices&&this.hass.entities&&(i=Object.entries(this.hass.entities).filter(([t,e])=>e.device_id===this.config.device_id).map(([t])=>t)),Object.entries(this.hass.states).filter(([s,r])=>{if(!r||!r.attributes)return!1;if(i&&!i.includes(s))return!1;if(this.config.entity_filter&&!s.toLowerCase().includes(this.config.entity_filter.toLowerCase()))return!1;return!!(this.config.entity_filter||this.config.device_id||s.toLowerCase().includes("thz")||s.toLowerCase().includes("tecalor")||s.toLowerCase().includes("lwz")||"thz"===r.attributes.integration||r.attributes.device_class&&JSON.stringify(r.attributes).toLowerCase().includes("thz"))&&(!(e&&!s.startsWith(e+"."))&&(t.test(s)||t.test(r.attributes.friendly_name||"")))}).map(([t])=>t)}_getEntityName(t){return t.attributes.friendly_name||t.entity_id?.split?.(".")[1]||"Unknown"}_handleSelectChange(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_handleSwitchToggle(t,e){const i=e?"turn_on":"turn_off";this.hass.callService("switch",i,{entity_id:t})}_handleNumberChange(t,e){const i=parseFloat(e);isNaN(i)||this.hass.callService("number","set_value",{entity_id:t,value:i})}static get styles(){return o`
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

      /* Temperature Graph Styles */
      .temperature-graph {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .graph-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .graph-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .refresh-button {
        background: none;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        color: var(--primary-text-color);
        cursor: pointer;
        padding: 4px 8px;
        font-size: 16px;
        transition: all 0.2s ease;
      }

      .refresh-button:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .graph-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
      }

      .legend-color {
        width: 20px;
        height: 3px;
        border-radius: 2px;
      }

      .legend-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .graph-svg {
        width: 100%;
        height: 200px;
        background: var(--card-background-color);
        border-radius: 4px;
      }

      .axis-label {
        font-size: 3px;
        fill: var(--secondary-text-color);
      }

      .grid-line {
        stroke: var(--divider-color);
        stroke-width: 0.1;
        opacity: 0.5;
      }

      .graph-loading {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
      }

      @media (max-width: 600px) {
        .sensor-grid,
        .control-grid {
          grid-template-columns: 1fr;
        }
      }
    `}});
//# sourceMappingURL=thz-card.js.map
