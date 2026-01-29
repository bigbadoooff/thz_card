/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,_=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:m).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,v?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,H=`<${C}>`,N=document,P=()=>N.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,O="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,B=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,F=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),G=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),W=new WeakMap,V=N.createTreeWalker(N,129);function q(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===D?"!--"===c[1]?n=M:void 0!==c[1]?n=U:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=B):void 0!==c[3]&&(n=B):n===B?">"===c[0]?(n=r??D,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?B:'"'===c[3]?F:R):n===F||n===R?n=B:n===M||n===U?n=D:(n=B,r=void 0);const d=n===B&&t[e+1].startsWith("/>")?" ":"";o+=n===D?s+H:l>=0?(i.push(a),s.slice(0,l)+A+s.slice(l)+k+d):s+k+(-2===l?e:d)}return[q(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,l]=Z(t,e);if(this.el=K.createElement(c,s),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=V.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=l[o++],s=i.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?st:X}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),V.nextNode(),a.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function J(t,e,s=t,i){if(e===G)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,i)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);V.currentNode=i;let r=V.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=N,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==I&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Y(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=I}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=J(this,i[s+n],e,n),a===G&&(a=this._$AH[n]),o||=!T(a)||a!==this._$AH[n],a===I?t=I:t!==I&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==I)}}class st extends X{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??I)===G)return;const s=this._$AH,i=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==I&&(s===I||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");customElements.define("thz-card-editor",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config=t}render(){return this.hass&&this.config?j`
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
      </div>
    `:j``}_deviceChanged(t){const e={...this.config};e.device_id=t.detail.value,this._updateConfig(e)}_entityFilterChanged(t){const e={...this.config};e.entity_filter=t.target.value,this._updateConfig(e)}_nameChanged(t){const e={...this.config};e.name=t.target.value,this._updateConfig(e)}_toggleTemperature(t){const e={...this.config};e.show_temperature=t.target.checked,this._updateConfig(e)}_toggleTemperatureGraph(t){const e={...this.config};e.show_temperature_graph=t.target.checked,this._updateConfig(e)}_toggleFanGraph(t){const e={...this.config};e.show_fan_graph=t.target.checked,this._updateConfig(e)}_toggleHeatingDetailsGraph(t){const e={...this.config};e.show_heating_details_graph=t.target.checked,this._updateConfig(e)}_graphHoursChanged(t){const e={...this.config},s=parseInt(t.target.value);!isNaN(s)&&s>=1&&s<=168&&(e.graph_hours=s,this._updateConfig(e))}_toggleMode(t){const e={...this.config};e.show_mode=t.target.checked,this._updateConfig(e)}_toggleHeatingCircuit(t){const e={...this.config};e.show_heating_circuit=t.target.checked,this._updateConfig(e)}_toggleHotWater(t){const e={...this.config};e.show_hot_water=t.target.checked,this._updateConfig(e)}_toggleCooling(t){const e={...this.config};e.show_cooling=t.target.checked,this._updateConfig(e)}_toggleStatus(t){const e={...this.config};e.show_status=t.target.checked,this._updateConfig(e)}_toggleStatistics(t){const e={...this.config};e.show_statistics=t.target.checked,this._updateConfig(e)}_toggleEnergy(t){const e={...this.config};e.show_energy=t.target.checked,this._updateConfig(e)}_toggleErrorsAlways(t){const e={...this.config};e.show_errors_always=t.target.checked,this._updateConfig(e)}_updateConfig(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}static get styles(){return o`
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
    `}});console.info("%c  THZ-CARD  \n%c  Version 1.1.0  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"thz-card",name:"THZ Card",description:"A custom card for controlling THZ heat pumps"});customElements.define("thz-card",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},_historyData:{type:Object}}}constructor(){super(),this._historyData={},this._loadingHistory=!1}static getConfigElement(){return document.createElement("thz-card-editor")}static getStubConfig(){return{name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,show_cooling:!0,show_status:!0,show_energy:!0,show_statistics:!0,show_errors_always:!1}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={name:"Heat Pump",show_temperature:!0,show_temperature_graph:!0,show_fan_graph:!0,show_heating_details_graph:!0,graph_hours:24,show_mode:!0,show_heating_circuit:!0,show_hot_water:!0,show_cooling:!0,show_status:!0,show_energy:!0,show_statistics:!0,show_errors_always:!1,...t}}getCardSize(){return 5}shouldUpdate(t){return!!this.config}render(){return this.config&&this.hass?j`
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
    `:j``}_renderTemperatureSection(){if(!this.config.show_temperature)return"";const t=this._findEntitiesByPattern(/temperature|temp/i,"sensor").filter(t=>!/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(t)),e=this._getKeyTemperatureSensors(t);return j`
      <div class="section">
        <div class="section-title">Temperatures</div>
        ${this.config.show_temperature_graph&&e.length>0?this._renderTemperatureGraph(e):""}
        <div class="sensor-grid">
          ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
              <div class="sensor-item">
                <div class="sensor-name">${s}</div>
                <div class="sensor-value">${i}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `}_getKeyTemperatureSensors(t){const e=[{pattern:/room.*temp|raum.*temp|indoor/i,found:null},{pattern:/outside.*temp|outdoor|au[sß]en.*temp|ambient/i,found:null},{pattern:/flow.*temp|vorlauf.*temp|supply/i,found:null},{pattern:/return.*temp|r[üu]cklauf.*temp/i,found:null}];t.forEach(t=>{const s=this.hass.states[t];if(!s)return;const i=(t+" "+(s.attributes.friendly_name||"")).toLowerCase();e.forEach(e=>{!e.found&&e.pattern.test(i)&&(e.found=t)})});const s=e.filter(t=>t.found).map(t=>t.found),i=t.filter(t=>!s.includes(t));return[...s,...i].slice(0,4)}_renderStatusBadge(){const t=this._findEntitiesByPattern(/state|status|mode|betrieb|operation|operating|zustand/i,"sensor");if(0===t.length)return j``;const e=this.hass.states[t[0]];if(!e)return j``;const s=e.state;let i="status-unknown",r="●";return/heat|heating|heizen/i.test(s)?(i="status-heating",r="🔥"):/cool|cooling|kühlen/i.test(s)?(i="status-cooling",r="❄️"):/idle|standby|bereit/i.test(s)?(i="status-idle",r="⏸️"):/defrost|abtau/i.test(s)?(i="status-defrost",r="🌨️"):/off|aus/i.test(s)&&(i="status-off",r="⭕"),j`
      <div class="status-badge ${i}">
        <span class="status-icon">${r}</span>
        <span class="status-text">${s}</span>
      </div>
    `}_renderStatistics(){const t=this._findEntitiesByPattern(/runtime|laufzeit|operating.*time|betriebszeit|hours|stunden/i,"sensor"),e=this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i,"sensor"),s=this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i,"sensor"),i=this._findEntitiesByPattern(/compressor|verdichter|starts|cycles/i,"sensor"),r=[];if(t.length>0){const e=this.hass.states[t[0]];e&&r.push({name:"Runtime",icon:"⏱️",value:e.state,unit:e.attributes.unit_of_measurement||""})}if(e.length>0){const t=this.hass.states[e[0]];t&&r.push({name:"Energy Today",icon:"⚡",value:t.state,unit:t.attributes.unit_of_measurement||""})}if(s.length>0){const t=this.hass.states[s[0]];if(t){const e=parseFloat(t.state);let s="cop-normal";isNaN(e)||(e>=4?s="cop-excellent":e>=3?s="cop-good":e<2&&(s="cop-poor")),r.push({name:"COP",icon:"📊",value:t.state,unit:t.attributes.unit_of_measurement||"",className:s})}}if(i.length>0){const t=this.hass.states[i[0]];t&&r.push({name:"Compressor",icon:"🔧",value:t.state,unit:t.attributes.unit_of_measurement||""})}return 0===r.length?"":j`
      <div class="statistics-section">
        <div class="stats-grid">
          ${r.map(t=>j`
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
    `}_renderTemperatureGraph(t){const e=t.slice(0,4);if(0===e.length)return"";e.some(t=>!this._historyData[t])&&!this._loadingHistory&&this._loadHistoryData(e);const s=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24"];return j`
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
          ${e.map((t,e)=>{const i=this.hass.states[t];if(!i)return"";const r=this._getEntityName(i);return j`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${s[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,s)}
      </div>
    `}_renderGraph(t,e){const s=10,i=40,r=100-i-10,o=200-s-20;if(!t.some(t=>this._historyData[t]&&this._historyData[t].length>0))return j`
        <div class="graph-loading">
          Loading graph data...
        </div>
      `;let n=1/0,a=-1/0,c=1/0,l=-1/0;if(t.forEach(t=>{(this._historyData[t]||[]).forEach(t=>{const e=parseFloat(t.state);isNaN(e)||(n=Math.min(n,e),a=Math.max(a,e));const s=new Date(t.last_changed).getTime();c=Math.min(c,s),l=Math.max(l,s)})}),!isFinite(n)||!isFinite(a))return j`
        <div class="graph-loading">
          No temperature data available
        </div>
      `;if(n===a)n-=1,a+=1;else{const t=a-n;n=Math.floor(n-.1*t),a=Math.ceil(a+.1*t)}const h=[];for(let t=0;t<=5;t++){const e=n+t/5*(a-n),s=o-t/5*o;h.push({temp:e.toFixed(1),y:s})}const d=t.map((t,s)=>{const i=this._historyData[t]||[];if(0===i.length)return null;const h=i.map(t=>{const e=parseFloat(t.state);if(isNaN(e))return null;return{x:(new Date(t.last_changed).getTime()-c)/(l-c)*r,y:o-(e-n)/(a-n)*o}}).filter(t=>null!==t);if(0===h.length)return null;const d=h.map((t,e)=>`${0===e?"M":"L"} ${t.x} ${t.y}`).join(" ");return{path:d,color:e[s]}}).filter(t=>null!==t);return j`
      <svg class="graph-svg" viewBox="0 0 100 ${200}" preserveAspectRatio="none">
        <!-- Y-axis labels -->
        <g class="y-axis">
          ${h.map(t=>j`
            <text 
              x="${i-5}" 
              y="${s+t.y}" 
              class="axis-label"
              text-anchor="end"
              alignment-baseline="middle">
              ${t.temp}
            </text>
            <line 
              x1="${i}" 
              y1="${s+t.y}" 
              x2="${i+r}" 
              y2="${s+t.y}" 
              class="grid-line" />
          `)}
        </g>
        
        <!-- Graph area -->
        <g class="graph-area" transform="translate(${i}, ${s})">
          ${d.map(t=>j`
            <path 
              d="${t.path}" 
              fill="none" 
              stroke="${t.color}" 
              stroke-width="0.5" 
              vector-effect="non-scaling-stroke" />
          `)}
        </g>
      </svg>
    `}async _loadHistoryData(t){if(this._loadingHistory)return;this._loadingHistory=!0;const e=this.config.graph_hours||24,s=new Date,i=new Date(s.getTime()-60*e*60*1e3);try{const e=t.join(","),r=await this.hass.callApi("GET",`history/period/${i.toISOString()}?filter_entity_id=${e}&end_time=${s.toISOString()}&minimal_response`),o={...this._historyData};r&&Array.isArray(r)&&t.forEach((t,e)=>{r[e]?o[t]=r[e]:o[t]=[]}),this._historyData=o,this.requestUpdate()}catch(t){console.error("Failed to load history data:",t)}finally{this._loadingHistory=!1}}_renderFanSection(){const t=this._findEntitiesByPattern(/fan|l[üu]fter|ventilat|speed|rpm|drehzahl/i,"sensor");return j`
      <div class="section">
        <div class="section-title">Fan Values</div>
        ${this.config.show_fan_graph&&t.length>0?this._renderFanGraph(t):""}
        ${t.length>0?j`
          <div class="sensor-grid">
            ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
                <div class="sensor-item">
                  <div class="sensor-name">${s}</div>
                  <div class="sensor-value">${i}${r}</div>
                </div>
              `})}
          </div>
        `:j`
          <div class="no-data">No fan sensors found</div>
        `}
      </div>
    `}_renderFanGraph(t){const e=t.slice(0,4);if(0===e.length)return"";e.some(t=>!this._historyData[t])&&!this._loadingHistory&&this._loadHistoryData(e);const s=["#9b59b6","#3498db","#1abc9c","#f39c12"];return j`
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
          ${e.map((t,e)=>{const i=this.hass.states[t];if(!i)return"";const r=this._getEntityName(i);return j`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${s[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,s)}
      </div>
    `}_renderHeatingDetailsSection(){const t=this._findEntitiesByPattern(/booster|pump|circuit.*pump|power|integral|heizleistung|leistung|compressor|verdichter|stage|stufe/i,"sensor").filter(t=>{const e=t.toLowerCase();return!/total.*energy|daily.*energy|temperature|temp/.test(e)});return j`
      <div class="section">
        <div class="section-title">Heating Details</div>
        ${this.config.show_heating_details_graph&&t.length>0?this._renderHeatingDetailsGraph(t):""}
        ${t.length>0?j`
          <div class="sensor-grid">
            ${t.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
                <div class="sensor-item">
                  <div class="sensor-name">${s}</div>
                  <div class="sensor-value">${i}${r}</div>
                </div>
              `})}
          </div>
        `:j`
          <div class="no-data">No heating detail sensors found</div>
        `}
      </div>
    `}_renderEnergySection(){const t=this._findEntitiesByPattern(/power|leistung|watt|kw/i,"sensor"),e=this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i,"sensor"),s=this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i,"sensor"),i=[...new Set([...t,...e,...s])];return 0===i.length?"":j`
      <div class="section">
        <div class="section-title">⚡ Energy & Efficiency</div>
        <div class="sensor-grid">
          ${i.slice(0,6).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";let o="sensor-item";if(/cop|efficiency|wirkungsgrad/i.test(s)){const t=parseFloat(i);isNaN(t)||(t>=4?o+=" cop-excellent":t>=3?o+=" cop-good":t<2&&(o+=" cop-poor"))}return j`
              <div class="${o}">
                <div class="sensor-name">${s}</div>
                <div class="sensor-value">${i}${r}</div>
              </div>
            `})}
        </div>
      </div>
    `}_renderHeatingDetailsGraph(t){const e=t.slice(0,4);if(0===e.length)return"";e.some(t=>!this._historyData[t])&&!this._loadingHistory&&this._loadHistoryData(e);const s=["#e74c3c","#e67e22","#16a085","#2ecc71"];return j`
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
          ${e.map((t,e)=>{const i=this.hass.states[t];if(!i)return"";const r=this._getEntityName(i);return j`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${s[e]}"></span>
                <span class="legend-label">${r}</span>
              </div>
            `})}
        </div>
        ${this._renderGraph(e,s)}
      </div>
    `}_renderModeSection(){const t=this._findEntitiesByPattern(/mode|betriebsart|operation|operating/i,"select"),e=this._findEntitiesByPattern(/mode|betriebsart|operation|operating|state|status/i,"sensor");return j`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        ${t.length>0?j`
          <div class="control-grid">
            ${t.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.options||[];return j`
                <div class="control-item">
                  <div class="control-name">${s}</div>
                  <select 
                    @change=${e=>this._handleSelectChange(t,e.target.value)}
                    .value=${i}>
                    ${r.map(t=>j`
                      <option value="${t}" ?selected=${t===i}>
                        ${t}
                      </option>
                    `)}
                  </select>
                </div>
              `})}
          </div>
        `:""}
        ${e.length>0?j`
          <div class="sensor-grid" style="margin-top: ${t.length>0?"12px":"0"}">
            ${e.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
                <div class="sensor-item">
                  <div class="sensor-name">${s}</div>
                  <div class="sensor-value">${i}${r}</div>
                </div>
              `})}
          </div>
        `:""}
        ${0===t.length&&0===e.length?j`
          <div class="no-data">No operation mode controls found</div>
        `:""}
      </div>
    `}_renderHeatingCircuitSection(){const t=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"number"),e=this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i,"switch");return j`
      <div class="section">
        <div class="section-title">Heating Circuit 1</div>
        <div class="control-grid">
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i="on"===e.state;return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <button 
                  class="switch-button ${i?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!i)}>
                  ${i?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${t.slice(0,3).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.min||0,o=e.attributes.max||100,n=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${i}
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
    `}_renderHotWaterSection(){const t=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"switch"),e=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"number"),s=this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i,"sensor");return j`
      <div class="section">
        <div class="section-title">Hot Water</div>
        <div class="control-grid">
          ${t.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i="on"===e.state;return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <button 
                  class="switch-button ${i?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!i)}>
                  ${i?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.min||0,o=e.attributes.max||100,n=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${i}
                    min=${r}
                    max=${o}
                    step=${n}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
        ${s.length>0?j`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${s.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
                <div class="sensor-item">
                  <div class="sensor-name">${s}</div>
                  <div class="sensor-value">${i}${r}</div>
                </div>
              `})}
          </div>
        `:""}
      </div>
    `}_renderCoolingSection(){const t=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"switch"),e=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"number"),s=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"sensor"),i=this._findEntitiesByPattern(/cooling|k[üu]hl/i,"select");return 0===t.length&&0===e.length&&0===s.length&&0===i.length?"":j`
      <div class="section cooling-section">
        <div class="section-title">❄️ Cooling</div>
        <div class="control-grid">
          ${t.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i="on"===e.state;return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <button 
                  class="switch-button ${i?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!i)}>
                  ${i?"ON":"OFF"}
                </button>
              </div>
            `})}
          ${i.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.options||[];return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <select 
                  @change=${e=>this._handleSelectChange(t,e.target.value)}
                  .value=${i}>
                  ${r.map(t=>j`
                    <option value="${t}" ?selected=${t===i}>
                      ${t}
                    </option>
                  `)}
                </select>
              </div>
            `})}
          ${e.slice(0,2).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.min||0,o=e.attributes.max||100,n=e.attributes.step||1,a=e.attributes.unit_of_measurement||"";return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${i}
                    min=${r}
                    max=${o}
                    step=${n}
                    @change=${e=>this._handleNumberChange(t,e.target.value)}>
                  <span class="unit">${a}</span>
                </div>
              </div>
            `})}
        </div>
        ${s.length>0?j`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${s.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state,r=e.attributes.unit_of_measurement||"";return j`
                <div class="sensor-item">
                  <div class="sensor-name">${s}</div>
                  <div class="sensor-value">${i}${r}</div>
                </div>
              `})}
          </div>
        `:""}
      </div>
    `}_renderAdditionalControls(){const t=this._findEntitiesByPattern(/emergency|party|holiday|vacation|urlaub/i,"switch").filter(t=>!/cooling|k[üu]hl/i.test(t));return 0===t.length?"":j`
      <div class="section">
        <div class="section-title">Additional Controls</div>
        <div class="control-grid">
          ${t.slice(0,4).map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i="on"===e.state;return j`
              <div class="control-item">
                <div class="control-name">${s}</div>
                <button 
                  class="switch-button ${i?"on":"off"}"
                  @click=${()=>this._handleSwitchToggle(t,!i)}>
                  ${i?"ON":"OFF"}
                </button>
              </div>
            `})}
        </div>
      </div>
    `}_renderErrorSection(){const t=/error|alarm|fault|fehler|st[öo]rung|warnung/i,e=[...this._findEntitiesByPattern(t,"sensor"),...this._findEntitiesByPattern(t,"binary_sensor")];if(0===e.length)return"";const s=e.filter(t=>{const e=this.hass.states[t];return!!e&&this._isErrorState(e.state)});if(0===s.length&&!this.config.show_errors_always)return"";const i=s.length>0;return j`
      <div class="section error-section ${i?"has-errors":""}">
        <div class="section-title">
          ${i?"⚠️ Alerts & Errors":"✓ System Status"}
        </div>
        ${i?j`
          <div class="error-list">
            ${s.map(t=>{const e=this.hass.states[t];if(!e)return"";const s=this._getEntityName(e),i=e.state;return j`
                <div class="error-item">
                  <div class="error-icon">⚠️</div>
                  <div class="error-content">
                    <div class="error-name">${s}</div>
                    <div class="error-value">${i}</div>
                  </div>
                </div>
              `})}
          </div>
        `:j`
          <div class="no-errors">
            <span class="success-icon">✓</span>
            <span>No errors or warnings detected</span>
          </div>
        `}
      </div>
    `}_isErrorState(t){const e=t.toLowerCase();return["on","true","active","problem","alarm","error","fault"].includes(e)}_findEntitiesByPattern(t,e=null){if(!this.hass)return[];let s=null;return this.config.device_id&&this.hass.devices&&this.hass.entities&&(s=Object.entries(this.hass.entities).filter(([t,e])=>e.device_id===this.config.device_id).map(([t])=>t)),Object.entries(this.hass.states).filter(([i,r])=>{if(!r||!r.attributes)return!1;if(s&&!s.includes(i))return!1;if(this.config.entity_filter&&!i.toLowerCase().includes(this.config.entity_filter.toLowerCase()))return!1;if(!(this.config.entity_filter||this.config.device_id||i.toLowerCase().includes("thz")||i.toLowerCase().includes("tecalor")||i.toLowerCase().includes("lwz")||"thz"===r.attributes.integration||r.attributes.device_class&&JSON.stringify(r.attributes).toLowerCase().includes("thz")))return!1;if(e&&!i.startsWith(e+"."))return!1;const o=i.includes(".")?i.split(".")[1]:i,n=r.attributes.friendly_name||"";return t.test(i)||t.test(o)||t.test(n)}).map(([t])=>t)}_getEntityName(t){return t.attributes.friendly_name||t.entity_id?.split?.(".")[1]||"Unknown"}_handleSelectChange(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_handleSwitchToggle(t,e){const s=e?"turn_on":"turn_off";this.hass.callService("switch",s,{entity_id:t})}_handleNumberChange(t,e){const s=parseFloat(e);isNaN(s)||this.hass.callService("number","set_value",{entity_id:t,value:s})}static get styles(){return o`
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
