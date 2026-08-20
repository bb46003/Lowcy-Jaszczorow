export default class lowcyRzut {
    constructor(actor = {}, cechy={}){
        this.actor = actor;
        this.cechy = cechy;
    }
    async prosty(){
        const formula = this.cechy.value;
        const cecha = this.cechy.name;
        const rzut = new Roll(formula);
        await rzut.evaluate()
        const results = rzut.total;
        let sucess = false;
        if(results <= 5){
            sucess = true
        };
        const content = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-prosty.hbs",
            {
                cechaName : this.cechy.name,
                sucess: sucess
            });

        const chatMessage = await rzut.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor}),
            flavor: content,
        })

        Hooks.once("renderChatMessageHTML", (message, html) => {
            if (message.id !== chatMessage.id) return;

            const rollContent = html.querySelector(".message-content");

            if (!rollContent) return;

            rollContent.classList.add(
                sucess ? "sukces" : "porazka"
            );
        });
    }
      async zlozony(){

let formula = "{";
const cechy = this.cechy;

formula += cechy.map(cecha => cecha.value).join(",");
formula += "}";

        const rzut = new Roll(formula);
        await rzut.evaluate()
        const results = rzut.dice;


const success = results.every(die => die.total <= 5);

const diceResults = results.map(die => ({
    formula: die.formula,
    result: die.total
}));
  
        const flavor = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-zlozony.hbs",
            {
                cechy : cechy,
                sucess: success
            });
        const content = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-zlozony-kostki.hbs",
            {
                diceResults : diceResults,
            });
        const chatMessage = await rzut.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor}),
            flavor: flavor,
            content: content
        })

        Hooks.once("renderChatMessageHTML", (message, html) => {
            if (message.id !== chatMessage.id) return;

            const rollContent = html.querySelector(".message-content");

            if (!rollContent) return;

            rollContent.classList.add(
                success ? "sukces" : "porazka"
            );
        });
    }
}

