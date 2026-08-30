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
        const sucess = results <= 5;
        const rolledDice = rzut.dice;
        const diceResults = rolledDice.map(die => ({
    formula: die.formula,
    result: die.total
}));
        const flavor = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-prosty.hbs",
            {
                cechaName : cecha,
                sucess: sucess
            });
        const content = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-zlozony-kostki.hbs",
            {
                diceResults : diceResults,
                sucess: sucess
            });
         await rzut.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor}),
            flavor: flavor,
            content: content
        })


    }
      async zlozony(){

let formula = "{";
const cechy = this.cechy;

formula += cechy.map(cecha => cecha.value).join(",");
formula += "}";

        const rzut = new Roll(formula);
        await rzut.evaluate()
        const results = rzut.dice;


const sucess = results.every(die => die.total <= 5);

const diceResults = results.map(die => ({
    formula: die.formula,
    result: die.total
}));
  
        const flavor = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-zlozony.hbs",
            {
                cechy : cechy,
                sucess: sucess
            });
        const content = await foundry.applications.handlebars.renderTemplate(
            "systems/lowcy-jaszczorow/templates/chat/chat-message-zlozony-kostki.hbs",
            {
                diceResults : diceResults,
                sucess: sucess
            });
       await rzut.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor}),
            flavor: flavor,
            content: content
        })


    }
}

