(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[518],{3194:function(e,t,i){"use strict";i.d(t,{I8:function(){return d},tO:function(){return c}});var n=i(3977),a=i(1259),s=i(6650),r=i(9828);let o=(0,n.ZF)({apiKey:"AIzaSyBWui1W0CBRAzvrMqHCOBUc3hMkmo3KkXw",authDomain:"tdt4140-prosjekt.firebaseapp.com",databaseURL:"https://tdt4140-prosjekt-default-rtdb.europe-west1.firebasedatabase.app",projectId:"tdt4140-prosjekt",storageBucket:"tdt4140-prosjekt.appspot.com",messagingSenderId:"807771308285",appId:"1:807771308285:web:43ebb655b020317c987e94"}),l=(0,r.ad)(o),c=(0,s.cF)(o),d=(0,a.v0)(o);class u{static getAuth(){return d}static getStorage(){return c}async getDestinations(){let e=(0,r.hJ)(l,"destinations");return(await (0,r.PL)(e)).docs.map(e=>({id:e.id,...e.data()}))}async getDestination(e){let t=(0,r.JU)(l,"destinations",e);return(await (0,r.QT)(t)).data()}async getReviewForDestinationUser(e,t){let i=(0,r.hJ)(l,"destinations",t,"reviews");return(await (0,r.PL)(i)).docs.map(e=>({reviewID:e.id,...e.data()})).filter(t=>t.userID===e)}async getReviewsForDestination(e){let t=(0,r.hJ)(l,"destinations",e,"reviews");return(await (0,r.PL)(t)).docs.map(e=>({reviewID:e.id,...e.data()}))}async addDestination(e,t,i,n,a){let s=(0,r.hJ)(l,"destinations");try{let o=await (0,r.ET)(s,{city:e,country:t,imgUrl:i,category:n,description:a||"",RatingCount:0,TotalRating:0}),l=(0,r.hJ)(o,"reviews");await (0,r.ET)(l,{})}catch(e){console.error(e)}}async getDestinationIDsForUser(e){let t=(0,r.hJ)(l,"user_destinations"),i=(0,r.IO)(t,(0,r.ar)("userID","==",e));return(await (0,r.PL)(i)).docs.map(e=>e.data().destinationID)}async getVisitedDestinations(e){let t=await e;if(0==t.length||null==t||void 0==t)return[];let i=(0,r.hJ)(l,"destinations"),n=(0,r.IO)(i,(0,r.ar)((0,r.Jm)(),"in",t));return(await (0,r.PL)(n)).docs.map(e=>({id:e.id,...e.data()}))}async editDestination(e,t,i,n){let a=(0,r.JU)(l,"destinations",e);try{await (0,r.r7)(a,{imgUrl:t,category:i,description:n})}catch(e){console.error(e)}}async deleteDestination(e){try{await (0,r.oe)((0,r.JU)(l,"destinations",e)),this.deleteAllReviews(e)}catch(e){console.log(e)}}async addReview(e,t,i,n,a){let s=(0,r.hJ)(l,"destinations",e,"reviews"),o=(0,r.JU)(l,"destinations",e),c=(await (0,r.QT)(o)).data();try{await (0,r.r7)(o,{TotalRating:(null==c?void 0:c.TotalRating)+t,RatingCount:(null==c?void 0:c.RatingCount)+1}),await (0,r.ET)(s,{rating:t,comment:i,email:n,userID:a})}catch(e){console.error(e)}}async updateReview(e,t,i,n){let a=(0,r.JU)(l,"destinations",e,"reviews",t),s=(0,r.JU)(l,"destinations",e,"reviews",t),o=(await (0,r.QT)(s)).data(),c=(0,r.JU)(l,"destinations",e),d=(await (0,r.QT)(c)).data();try{await (0,r.r7)(c,{TotalRating:(null==d?void 0:d.TotalRating)+i-(null==o?void 0:o.rating)}),await (0,r.r7)(a,{rating:i,comment:n})}catch(e){console.error(e)}}async deleteReview(e,t){let i=(0,r.JU)(l,"destinations",e,"reviews",t),n=(await (0,r.QT)(i)).data(),a=(0,r.JU)(l,"destinations",e),s=(await (0,r.QT)(a)).data();try{await (0,r.r7)(a,{TotalRating:(null==s?void 0:s.TotalRating)-(null==n?void 0:n.rating),RatingCount:(null==s?void 0:s.RatingCount)-1}),await (0,r.oe)((0,r.JU)(l,"destinations",e,"reviews",t))}catch(e){console.error(e)}}getAuthInstance(){return d}async setUserDestination(e,t){let i=(0,r.hJ)(l,"user_destinations");try{await (0,r.ET)(i,{destinationID:t,userID:e})}catch(e){console.error("Error creating user document:",e)}}async removeUserDestination(e,t){(await (0,r.PL)((0,r.IO)((0,r.hJ)(l,"user_destinations"),(0,r.ar)("userID","==",e),(0,r.ar)("destinationID","==",t)))).forEach(async e=>{await (0,r.oe)(e.ref)})}async checkIfVisited(e,t){if("string"!=typeof e)return!1;try{return!(await (0,r.PL)((0,r.IO)((0,r.hJ)(l,"user_destinations"),(0,r.ar)("userID","==",e),(0,r.ar)("destinationID","==",t)))).empty}catch(e){return console.error("Error checking if destination is visited:",e),!1}}async deleteAllReviews(e){let t=(0,r.hJ)(l,"destinations",e,"reviews");try{(await (0,r.PL)(t)).forEach(async e=>{await (0,r.oe)(e.ref)})}catch(e){console.error(e)}}async getDestinationsWithVisited(e){let t=(0,r.hJ)(l,"destinations"),i=await (0,r.PL)(t);if(void 0!==e){let t=[];for(let n of i.docs)await this.checkIfVisited(null==e?void 0:e.uid,n.id).then(e=>{t.push({id:n.id,visited:e,...n.data()})});return t}return i.docs.map(e=>({id:e.id,visited:!1,...e.data()}))}}t.ZP=u},6424:function(e,t,i){"use strict";var n=i(5893),a=i(7294),s=i(3194);i(376),t.Z=e=>{let{onClose:t,checkDuplicates:i,destinationList:r}=e,o=new s.ZP,[l,c]=(0,a.useState)(""),[d,u]=(0,a.useState)(""),[h,v]=(0,a.useState)(""),[m,g]=(0,a.useState)(""),[w,p]=(0,a.useState)(""),[x,j]=(0,a.useState)(""),[f,b]=(0,a.useState)(""),[y,N]=(0,a.useState)([]),D={Activities:["Hiking","Skiing","Sightseeing"],"Destination type":["City","Beach","Culture","Safari","Historical","Active"]},C=async()=>{let e=[];i(m,h,r)?b("This destination already exists"):""!==h&&""!==m&&""!==w&&""!==d&&""!==l?(e.push(l),e.push(d),y.map(t=>e.push(t)),await o.addDestination(h,m,w,e,x),null==t||t()):b("Fill inn all fields")};return(0,n.jsxs)("div",{id:"addDestination",className:"not-blur",children:[(0,n.jsx)("button",{id:"x-button",onClick:t,className:"not-blur",children:"X"}),(0,n.jsxs)("div",{id:"addDestination-inner",className:"not-blur",children:[(0,n.jsx)("h1",{className:"not-blur",children:"New travel destination"}),(0,n.jsx)("h5",{id:"statusMessage",className:"not-blur",children:f}),(0,n.jsxs)("form",{className:"not-blur",children:[(0,n.jsxs)("label",{className:"not-blur",children:["City:",(0,n.jsx)("input",{name:"city",className:"not-blur",onChange:e=>v(e.target.value)})]}),(0,n.jsxs)("label",{className:"not-blur",children:["Country:",(0,n.jsx)("input",{name:"country",className:"not-blur",onChange:e=>g(e.target.value)})]}),(0,n.jsxs)("label",{className:"not-blur",children:["Image url:",(0,n.jsx)("input",{name:"imgURL",className:"not-blur",onChange:e=>p(e.target.value)})]}),(0,n.jsx)("h3",{className:"not-blur",children:"Apply tags"}),(0,n.jsxs)("select",{className:"not-blur",defaultValue:"",onChange:e=>c(e.target.value),children:[(0,n.jsx)("option",{value:"",disabled:!0,children:"continent"}),(0,n.jsx)("option",{value:"africa",children:"Africa"}),(0,n.jsx)("option",{value:"asia",children:"Asia"}),(0,n.jsx)("option",{value:"europe",children:"Europe"}),(0,n.jsx)("option",{value:"northAmerica",children:"North-America"}),(0,n.jsx)("option",{value:"southAmerica",children:"South-America"}),(0,n.jsx)("option",{value:"oceania",children:"Oceania"})]}),(0,n.jsxs)("select",{className:"not-blur",defaultValue:"",onChange:e=>u(e.target.value),children:[(0,n.jsx)("option",{value:"",disabled:!0,children:"climate"}),(0,n.jsx)("option",{value:"continental",children:"Continental"}),(0,n.jsx)("option",{value:"dry",children:"Dry"}),(0,n.jsx)("option",{value:"polar",children:"Polar"}),(0,n.jsx)("option",{value:"temperate",children:"Temperate"}),(0,n.jsx)("option",{value:"tropical",children:"Tropical"})]}),(0,n.jsx)("div",{className:"not-blur",id:"checkbox-container",children:(()=>{let e=e=>{let t=e.target.value;e.target.checked?N(e=>[...e,t]):N(e=>e.filter(e=>e!==t))};return(0,n.jsx)(n.Fragment,{children:Object.entries(D).map(t=>{let[i,a]=t;return(0,n.jsxs)("div",{className:"not-blur",children:[(0,n.jsx)("h4",{className:"not-blur",children:i}),(0,n.jsx)("div",{className:"not-blur",id:"category-checkbox-container",children:a.map(t=>(0,n.jsxs)("label",{className:"not-blur",children:[(0,n.jsx)("input",{type:"checkbox",className:"not-blur",value:t,onChange:e}),t]},t))})]},i)})})})()})]}),(0,n.jsx)("h4",{className:"not-blur",children:"Description"}),(0,n.jsx)("textarea",{className:"not-blur",rows:12,cols:60,style:{resize:"none"},onChange:e=>j(e.target.value)}),(0,n.jsx)("button",{id:"addButton",className:"not-blur",onClick:C,children:" Add new destination "})]})]})}},343:function(e,t,i){"use strict";var n=i(5893),a=i(7294);i(8698);var s=i(3194),r=i(7576),o=i(6156),l=i(8429),c=i(9603),d=i(9417);t.Z=e=>{let{id:t,country:i,city:u,rating:h,tags:v,description:m,imgURL:g,admin:w,onClose:p,user:x,visited:j,onEdit:f,onDelete:b}=e,[y,N]=(0,a.useState)([]),[D,C]=(0,a.useState)(2.5),[I,k]=(0,a.useState)(""),[R,S]=(0,a.useState)(""),J=new s.ZP,[P,E]=(0,a.useState)(!1),[U,O]=(0,a.useState)(!1),[T,A]=(0,a.useState)(h),[Z,F]=(0,a.useState)(!1);(0,a.useEffect)(()=>{J.getReviewsForDestination(t).then(e=>{N(JSON.parse(JSON.stringify(e)))}),E(j)},[]),(0,a.useEffect)(()=>{J.getDestination(t).then(e=>{A((null==e?void 0:e.RatingCount)==0?0:(null==e?void 0:e.TotalRating)/(null==e?void 0:e.RatingCount)),F(!1)})},[Z]),(0,a.useEffect)(()=>{if(x){let e=y.filter(e=>e.userID===x.uid);0!==e.length&&(S(e[0].reviewID),k(e[0].comment),C(e[0].rating))}},[y]);let V=e=>{k(e.target.value)},_=()=>{J.updateReview(t,R,D,I).then(()=>{J.getReviewsForDestination(t).then(e=>{N(JSON.parse(JSON.stringify(e)))}),F(!0),O(!1)})},L=()=>{J.deleteReview(t,R).then(()=>{G()})},G=()=>{J.getReviewsForDestination(t).then(e=>{N(JSON.parse(JSON.stringify(e)))}),F(!0),O(!1),S(""),k(""),C(2.5)},B=()=>{confirm("Are you sure you want to delete this review?\nClick either OK or Cancel.")&&L()};return(0,n.jsxs)("div",{id:"modal-container",className:"not-blur",children:[(0,n.jsx)("button",{id:"x-button",onClick:p,className:"not-blur",children:"X"}),(0,n.jsx)("img",{src:g,alt:"Error",className:"not-blur"}),(0,n.jsxs)("div",{id:"admin-buttons",className:"not-blur",children:[w&&(0,n.jsxs)("button",{id:"edit-button",onClick:f,className:"not-blur",children:["Edit ",(0,n.jsx)(c.G,{id:"icon",className:"not-blur",icon:d.Yai})]}),w&&(0,n.jsxs)("button",{id:"delete-button",className:"not-blur",onClick:function(){confirm("Are you sure you want to delete this destination?\nClick either OK or Cancel.")&&b&&b()},children:["Delete",(0,n.jsx)(c.G,{id:"icon",className:"not-blur",icon:d.Vui})]})]}),(0,n.jsxs)("div",{id:"info-container",className:"not-blur",children:[(0,n.jsx)("div",{id:"title-container",className:"not-blur",children:(0,n.jsxs)("h1",{className:"not-blur",children:[u,", ",i]})}),(0,n.jsx)("div",{id:"visited-container",className:"addPadding not-blur",children:(0,n.jsx)(o.Z,{id:t,user:x,extraHandling:()=>G()})}),(0,n.jsx)("div",{id:"weather-display-container",className:"addPadding not-blur",children:(0,n.jsx)(l.Z,{country:i,city:u})}),(0,n.jsx)("div",{id:"rating-container",className:"addPadding not-blur",children:(0,n.jsx)(r.Z,{name:"average-rating",precision:.25,value:T,readOnly:!0})}),(0,n.jsx)("div",{id:"tag-container",className:"addPadding not-blur",children:v.length?"Tags: "+(null==v?void 0:v.join(", ")):"There are no tags for this destination"}),(0,n.jsx)("div",{id:"description-container",className:"addPadding not-blur",children:m||"No description for this destiantion"}),R?U?(0,n.jsx)("div",{children:y.filter(e=>e.reviewID===R).map(e=>(0,n.jsxs)("div",{id:"myrating-container",className:"addPadding not-blur",children:["Edit your review:",(0,n.jsx)("div",{id:"starRating",className:"not-blur",children:(0,n.jsx)(r.Z,{name:"half-rating",defaultValue:e.rating,precision:.5,onChange:(e,t)=>C(t)})}),(0,n.jsx)("textarea",{id:"review-destinations",rows:1,onChange:V,defaultValue:e.comment}),(0,n.jsxs)("div",{children:[(0,n.jsx)(c.G,{id:"back-review",className:"not-blur",icon:d.a0w,onClick:()=>O(!1)}),(0,n.jsx)(c.G,{id:"update-review",className:"not-blur",icon:d.fV7,onClick:_}),(0,n.jsx)(c.G,{id:"delete-review",className:"not-blur",icon:d.Vui,onClick:B})]})]},e.reviewID))}):(0,n.jsxs)("div",{id:"reviewfeed-container",className:"addPadding not-blur",children:[(0,n.jsx)("h3",{children:"My Review"}),(0,n.jsx)("hr",{}),y.filter(e=>e.reviewID===R).map(e=>(0,n.jsxs)("div",{style:{justifyContent:"space-between"},children:[(0,n.jsxs)("div",{id:"top-of-review",children:[(0,n.jsx)("div",{style:{opacity:.5},children:e.email}),(0,n.jsx)(c.G,{id:"edit-button",className:"not-blur",icon:d.Yai,onClick:()=>O(!0)})]}),(0,n.jsx)(r.Z,{style:{opacity:.5},name:"half-rating",value:e.rating,precision:.5,readOnly:!0}),(0,n.jsx)("div",{style:{opacity:.5},children:e.comment})]},e.reviewID))]}):(0,n.jsxs)("div",{id:"myrating-container",className:"addPadding not-blur",children:["Add review:",(0,n.jsx)("div",{id:"starRating",className:"not-blur",children:(0,n.jsx)(r.Z,{name:"half-rating",defaultValue:2.5,precision:.5,onChange:(e,t)=>C(t)})}),(0,n.jsx)("textarea",{id:"review-destinations",rows:1,value:I,onChange:V,placeholder:"Optional comment"}),(0,n.jsx)("button",{id:"submit-review",className:"addPadding not-blur",onClick:()=>{x&&!R&&J.checkIfVisited(x.uid,t).then(e=>{e?J.addReview(t,D,I,x.email,x.uid).then(()=>{F(!0)}).then(()=>{J.getReviewsForDestination(t).then(e=>{N(JSON.parse(JSON.stringify(e)))})}):alert("You can not give a review on a destination you have not visited.")})},children:"Submit"})]}),0!=y.filter(e=>""!==e.comment&&e.comment&&e.reviewID!==R).length&&(0,n.jsxs)("div",{id:"reviewfeed-container",className:"addPadding not-blur",children:[(0,n.jsx)("h3",{children:"All Reviews"}),y.filter(e=>""!==e.comment&&e.comment&&e.reviewID!==R).map(e=>(0,n.jsxs)("div",{children:[(0,n.jsx)("hr",{}),(0,n.jsxs)("div",{id:"singlereview-container",children:[(0,n.jsx)("div",{id:"top-of-review",children:e.email}),(0,n.jsx)(r.Z,{name:"half-rating",value:e.rating,precision:.5,readOnly:!0}),(0,n.jsx)("div",{children:e.comment})]})]},e.reviewID))]})]})]})}},8350:function(e,t,i){"use strict";var n=i(5893),a=i(7294);i(2098),t.Z=e=>{let{categories:t,onFilterChange:i}=e,[s,r]=(0,a.useState)([]),o=e=>{let t=s.includes(e)?s.filter(t=>t!==e):[...s,e];r(t),i(t)};return(0,n.jsx)("div",{id:"filterPanel-container",children:Object.entries(t).map(e=>{let[t,i]=e;return(0,n.jsxs)("div",{id:"menu-container",children:[(0,n.jsx)("h4",{children:t}),(0,n.jsx)("div",{id:"checkbox-container",children:i.map((e,t)=>(0,n.jsxs)("label",{children:[(0,n.jsx)("input",{type:"checkbox",value:e,checked:s.includes(e),onChange:()=>o(e)}),e]},t))})]},t)})})}},6156:function(e,t,i){"use strict";var n=i(5893),a=i(7294),s=i(3194);i(7834);var r=i(9603),o=i(9417);t.Z=e=>{let{user:t,id:i,extraHandling:l}=e,[c,d]=(0,a.useState)(!1),u=()=>{(async()=>{try{let e=new s.ZP,n=await e.checkIfVisited(null==t?void 0:t.uid,i);d(n)}catch(e){console.error("Error checking if visited:",e)}})()};u(),(0,a.useEffect)(()=>{u()},[]);let h=()=>{new s.ZP().removeUserDestination(null==t?void 0:t.uid,i).then(()=>{console.log("User removed from destination's list:",i),l()})},v=async e=>{e.stopPropagation();try{let e=new s.ZP;c?e.getReviewForDestinationUser(null==t?void 0:t.uid,i).then(t=>{t.length?!confirm("You have written a review for this destination, and can not have a review for a destination you have not visited.\n If you continue, the review will be deleted.")||e.deleteReview(i,t[0].reviewID).then(()=>{h()}):h()}):(await e.setUserDestination(null==t?void 0:t.uid,i),console.log("User added to destination's list:",i)),d(!c)}catch(e){console.error("Error handling checkbox change:",e)}};return(0,n.jsx)(n.Fragment,{children:c?(0,n.jsx)(r.G,{className:"visitedIcon",icon:o.wJh,onClick:v,style:{color:"#63E6BE"}}):(0,n.jsx)(r.G,{className:"visitedIcon",icon:o.wJh,onClick:v,style:{color:"#c0c0c0"}})})}},8429:function(e,t,i){"use strict";var n=i(5893),a=i(7294);i(8085);var s=i(5675),r=i.n(s);t.Z=e=>{let{country:t,city:i}=e,[s,o]=(0,a.useState)(0),[l,c]=(0,a.useState)([]);return(0,a.useEffect)(()=>{fetch("https://restcountries.com/v3.1/name/".concat(t)).then(e=>e.json()).then(e=>{let t=e[0].cca2,n="http://api.openweathermap.org/geo/1.0/direct?q=".concat(i,",").concat(t,"&limit=1&appid=971ff3c555137597d9b8ceea73588668");fetch(n).then(e=>e.json()).then(e=>{let t="https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=".concat(e[0].lat,"&lon=").concat(e[0].lon);fetch(t).then(e=>e.json()).then(e=>{o(e.properties.timeseries[0].data.instant.details.air_temperature),c(e.properties.timeseries[0].data.next_1_hours.summary.symbol_code)}).catch(()=>console.log("Error fetching weather data"))}).catch(()=>console.log("Error fetching geolocation"))}).catch(()=>console.log("Error fetching country code"))}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"temperatureContainer",children:[s,"\xb0C"]}),(0,n.jsx)("div",{className:"weatherIconContainer",children:0!=l.length?(0,n.jsx)(r(),{src:"/weatherIcons/".concat(l,".png"),alt:"".concat(l),width:200,height:200,style:{width:"auto",height:"100%"}}):(0,n.jsx)(n.Fragment,{})})]})}},376:function(){},8698:function(){},2098:function(){},7834:function(){},5428:function(){},8085:function(){}}]);