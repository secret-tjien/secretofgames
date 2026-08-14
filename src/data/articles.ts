import { RawArticleData, ParsedArticle } from '../types/article';
import { parseArticle } from '../utils/articleParser';

/**
 * ============================================================================
 * ARTICLE REPOSITORY (SINGLE DOCUMENT FOR ALL ARTICLES)
 * ============================================================================
 * You can easily add, edit, or remove articles in this file.
 * 
 * Each article follows this simple structure:
 * - HeaderTitle: The main article headline
 * - HeaderImage: Path to image (e.g. 'src/files/articles/HowToDesignValue-Part1.png') or YouTube link
 * - HeaderSubTitle: Subtitle text displayed at the bottom of the colored header
 * - BodyText1, BodyText2, ... : Consecutive paragraphs of text
 * - BodyImage1, BodyImage2, ... : Path to image or YouTube link
 * - BodyImage1Text, BodyImage2Text, ... : Image explanation / caption text
 * 
 * Background colors are dynamically assigned using the "Tetris random" distribution
 * among Yellow (#FFE800), Blue (#29ABE1), Red (#ED2024), and Green (#3CB64B).
 * ============================================================================
 */

export const RAW_ARTICLES: RawArticleData[] = [
  {
    id: 'how-to-design-value-part-1',
    slug: 'how-to-design-value-part-1',
    HeaderTitle: 'How to design value | Part 1',
    HeaderImage: 'src/files/articles/HowToDesignValue-Part1.png',
    HeaderSubTitle: 'How to design game systems that create value for the player. Value is always experienced in a context that allows comparison – in the case of games, this is designed.',

    BodyText1: `Demand for more valuable games that offer more fun and more engagement for the player is only going to get bigger. With the overwhelming majority of games being available for free after a short download there’s hardly any commitment from the player and the next game is just an ad or a scroll away.

So how do you create games that have a lasting impact, that maintain the player’s interest for longer and eventually provide so much joy that players feel it is worth spending money on?

The list of must have ingredients that any game needs to be successful is nearly endless, but can be broken down into 3 pillars – the triforce of spend – fun, trust and value.

Each of these pillars can have an unlimited amount of ingredients, but let’s focus on Value for today. How do you design a game that creates value for the player?

To answer that question, we need to understand what value is. Value is quite an abstract concept to understand and what I found out is that value can only exist if there’s a comparison between 2 things. We can only understand the value of anything when it is placed and directly comparable to a context.

This is extremely important for game design and the creation of value is that the context determines the value of anything. Fresh clean drinking water is of less value in the Netherlands, as it comes flowing out of each tap, with anyone and everybody having access to it all time, whereas it is easy to imagine that fresh clean drinking water is super valuable in scorching hot desert environments.

With games, the game itself is largely creating that context of value – and that needs to be at the heart of the game’s design. A great context in game’s is the one that allows the player to feel and experiment with the value of their actions. Creating a game system that allows players to influence the value created through play is a great start. So what does that mean in practicality?

Let’s imagine the least valuable game as a starting point. Let’s say there’s a game that requires a player to tap a button to complete the level. Extremely simple, just 1 big button and a single tap, done. It would be an extremely boring game, just tap, next level, tap, next level, endlessly. The outcome of each level is always the same (+1) and there is no way for the player to make a difference, the value of the player input is approximately zero.`,

    BodyImage1: 'src/files/articles/value_part1_1.png',
    BodyImage1Text: 'A rather boring game with 0 value',

    BodyText2: `Value arises by making the player input valuable and directly related to the player’s input, the player’s performance if you will. So let’s say the button changes color and the player needs to time the button press precisely when it’s maxed out “green”. Also the button moves and changes shape. The smaller the button the more points it’s worth. Suddenly a game arises where the player’s input directly matters. A space of possible outcomes is available. Value is created.`,

    BodyImage2: 'src/files/articles/value_part1_2.png',
    BodyImage2Text: 'A slightly less boring game, with a bit of value',

    BodyText3: `So let’s break down what just happened. We created a system where there is no longer 1 outcome of a level, but a flexible amount of points. Let’s imagine the button slowly changing color between red and green. When it’s red it is worth 1 point and the closer it gets to green the value increases to a maximum of 100 points. Pressing the button when it’s max green is worth 100 points. The outcome of playing this level is anywhere between 1 and 100. There is value created in the player’s mind when the rule is understood. Although, this game will lose its value quickly (once the player is able to get that 100 score all the time) you can sense it is already more fun and more valuable than the earlier example. Now imagine the size of the button also changes and the size determines a multiplication factor of the color score. The smallest button which is super hard to press and see on screen is worth x10 the value and the largest button is worth x1 the value. Suddenly the player is faced with an interesting dilemma and score outcome possibility space increases to become 1 for a large red button (1 x 1 = 1) and 1000 points for a very small green button (10 x 100 = 1000). Although this game is not the most fun you can imagine, it does make the player’s input more valuable.

What’s important to notice here too is that the value is made very clear and tangible to the player. The level can end with a score – a direct reflection of the player’s performance. The context that we created for which we base our understanding of the value of our performance is in the outcome space (1-1000) AND the difficulty of pressing that button at the right moment. When the button changes colors fast and the size changes fast in a different rhythm, it becomes hard to get that perfect score. Nailing close to 1000 feels good in that context and is perceived more valuable because it is more challenging.

How to use the value that we created in a system that can be monetized is something I will discuss in the second part of this series.`,
  },
  {
    id: 'unwritten-rules',
    slug: 'unwritten-rules',
    HeaderTitle: 'Unwritten Rules',
    HeaderImage: 'src/files/articles/UnwrittenRules.png',
    HeaderSubTitle: 'The unwritten rules of games hide some fundamental truths about game design. Even though they are hidden it would be unwise to break these rules.',

    BodyText1: `There are several unwritten rules of games that are so universal and feel so obvious that we tend to take them for granted and hardly ever think about them. However, forget about these rules and you’ll find yourself wondering why a game doesn’t work or why the experience isn’t any fun.

I will extend this list of unwritten rules of games as I discover more. Please feel free to add more unwritten rules of games if you know of them.`,

    BodyTitle2: 'Play is voluntarily',
    BodyText2: `There is no denying anymore that playing (games) is good for us. Animals play to ready themselves for adulthood and kids do too. But play is fragile and lost when it is no longer engaged voluntarily. A game that is played to pursuit real life consequences becomes a job, a remedy or a study object. As a consequence, games need to be disconnected from reality, a safe space to experiment and fantasize. This exclusion zone is often referred to as the magic circle, first coined so by Dutch historian Johan Huizinga in his book Homo Ludens.`,

    BodyTitle3: 'Games are fair',
    BodyText3: `Games need to be fair to their players. Remember playing games when you were young and there was always one kid who felt it was necessary to change the rules every time they were about to loose? Or finding out that moment during Monopoly that a player was stealing money from the bank? Like with life, games provide a set of temporal rules that you as a player accept to have a good time. If the game suddenly changes its rules without any logic, or a multiplayer game is filled with cheating players, the game ceases to be enjoyable.`,

    BodyTitle4: 'Games afford progression',
    BodyText4: `Engaging in play needs to result in progression. Progression as the cornerstone of fun needs to be afforded by games – as that is their promise to the player – that engaging with them progresses the player towards the game’s goals, or story.`,

    BodyTitle5: 'Feedback is responsive',
    BodyText5: `An extension of the games are fair unwritten rule is the fact that feedback to player action is always responsive. The game must never leave the player guessing if the action that was just performed was registered by the game. Even games that play with delays in actions the fact that a player pressed a button on the controller or tapped the screen should be acknowledged by the game in order to allow the player to play the game comfortably`,

    BodyTitle6: 'Games are about players',
    BodyText6: `All games are about their players – it is in the minds of the player that the experience is formed. Games and their design revolve around players with different interests and in different walks of life.`,

    BodyTitle7: 'F2P must mean fun for free',
    BodyText7: `In order to fulfill the expectation of the player when a game is advertised as free-to-play (F2P) the game must allow the player to play and enjoy the game for free. Again, this rule can be seen as an extension to the games must be fair rule mentioned above.`,
  },
  {
    id: 'game-monetization-101',
    slug: 'game-monetization-101',
    HeaderTitle: 'Game Monetization 101',
    HeaderImage: 'src/files/articles/GameMonetizationPrimer.png',
    HeaderSubTitle: 'Games can be monetized in different ways, premium up front cost, free-to-play, as part of a subscription, and so forth. I’ll dive into each of the common monetization strategies and explain how they work.',

    BodyText1: `Games can be monetized in different ways, premium up front cost, free-to-play, as part of a subscription, and so forth. I’ll dive into each of the common monetization strategies and explain how they work. Next, I’ll dive into how to select the right one for your particular game, taking into account your audience, your target device, your team and your ambitions.

Selecting the right monetization strategy for your game

Creating a great game is not the only thing you need to make sure your game is profitable. You need to think about the right monetization strategy before you start thinking about making any game, especially on mobile devices.

Discoverability — the ease or rather the difficulty of finding your game — is one of the toughest areas that game releases currently encounter. There are so many games available to our players, that they simply can’t all be listed in an effective way.

Developers have long lowered and lowered their prices for their games in order to reach a bigger and bigger audience. And although that strategy was profitable for a short time, the bottom of that downward spiral was soon reached when developers were giving their game away for free. And with that players didn’t have to think about, or know if they would be interested in a game, that moment of friction was completely taken away.

But does that mean that Free to Play is always the best and most valid option for your game? And the answer is — not always and really dependent on a lot of factors.`,

    BodyTitle2: 'Monetization Methods',
    BodyText2: 'Game monetization can be divided into three main categories:',

    BodySubTitle3: 'F2P — Free to Play',
    BodyText3: 'The game can be installed and played for free. Sometimes, a game can be started for free and the player will need to pay to unlock the rest of the game, often referred to as F2S or Free to Start.',

    BodySubTitle4: 'Premium',
    BodyText4: 'The player pays upfront to unlock the game.',

    BodySubTitle5: 'Service Subscription Benefit',
    BodyText5: 'The player can play the game as long as they are an active subscriber of a service',

    BodyTitle6: 'Monetization Methods Overview',
    BodyImage6: 'src/files/articles/GameMonetization.png',
    BodyImageText6: 'Overview of monetization methods',
    BodyImageText: 'Overview of monetization methods',

    BodyTitle7: 'F2P | Ads',
    BodyText7: 'Ads in games come in many different flavors. In most cases they will display an add for a competing game or at least try to match your game’s players interests to similar interests. This means that you will lose players because they saw an ad in your game. This is a clear trade-off you need to take into account.',

    BodyTitle8: 'F2P | Ads | Banner',
    BodyText8: `Banner ads usually have a distinct place in your app — for instance at the bottom of the screen. They overtake a small part of the screen, in most cases displaying various advertisements in sequence, similar to how banner ads are displayed on websites. It functions as a billboard and usually features some text and/or fast loading images, some ads feature motion graphics to attract more attention.

More recently in-context ads are becoming more common and are more intertwined with the game experience. These might be featured as part of the in game (item) shop or as advertisements in the game environment. Think of advertisements along the edges of a football match or billboards in a racing game. In-game product placement is another form of in-context advertisement.

Another fairly new example of banner ads is the app-open advertisement, where the ad overtakes a large part of the screen while the game or app is loading. A small section of the screen is reserved to show that the app or game is finished loading.`,

    BodyTitle9: 'F2P | Ads | Interstitial',
    BodyText9: `These advertisements overtake the complete experience. These ads are very invasive and force the player to watch the ad. Placing these ads at strategic low engagement points reduces the annoyance, but they are still forced.

Interstitial ads come in various forms, such as static (images), dynamic (video) or playabale. A mixed variation is also seen quite a lot, where the interstitial begins with a video, followed by a playable.`,

    BodyTitle10: 'F2P | Ads | Rewarded Interstitial',
    BodyText10: 'Rewarded interstitials are similar to the regular interstitial ads in the way they overtake the experience. However, common practice is to show an intro to the ad — usually announcing an ad is incoming AND that watching the ad fully will result in a reward. These ads can be skipped by closing them (Opt-Out). A reward is given by the game when the player decides to continue watching the ad until the timer is done (usually 30 seconds)',

    BodyTitle11: 'F2P | Ads | Rewarded Video & Playable',
    BodyText11: `Rewarded video ads are only displayed when a player makes an active choice to watch them (Opt-In). These ads can often be skipped, but the reward is only given if the ad is completed.

Common is also to include a playable ad right after the rewarded video, as an interactable scene or minigame, the rewarded playable offers the reward after a certain time is passed (usually 30 seconds).`,

    BodyTitle12: 'F2P | IAP',
    BodyText12: `Free to Play can offer various purchases in games. They can be divided into a couple of major sections.

Consumables — these items are bought and depleted upon using them in-game, think of extra lives, energy, boosters and power-ups. Currencies such as gold, gems, diamonds are often used to transform real money into a game specific token that allow the user exchange these to other in-game items. In-game currencies offer a more fine grained value and allows the game to provide these in lower volume as a game reward. Mixing in-game rewarded currencies and bought currencies will obfuscate the value, just like drink tokens in a club.

Non-consumable — these items stay in the player’s inventory for the entire duration of the game life-time, and need to be warranted by the game even after the game is downloaded. Think about cosmetic items, or “no-more-ads” purchases.

Paywall — this is a particular non-consumable item often found in games better known as “Free-to-Start” games. These games offer only a small part of the game experience for free and the rest of the game is locked beyond the paywall. Once a player has purchased this non-consumable, the rest of the game’s content is unlocked.`,

    BodyTitle13: 'F2P | IAP| Subscription',
    BodyText13: 'Subscription can offer any kind of benefit in game, but ties the benefits to a particular duration. Subscriptions often occur in weekly, monthly or yearly durations and are paid upfront. In some cases a subscription trial period is also available. Subscriptions often auto-renew after their duration expires. An effect witnessed in many subscriptions are so called “zombie” subscriptions where the subscriber pays for the benefits but hardly or never uses it.',

    BodyTitle14: 'F2P | IAP| Donation',
    BodyText14: 'A donation in-app purchase does not directly benefit the player with an in-game return and can be found in indie games that rely on player goodwill.',

    BodyTitle15: 'F2P | IAP| Merchandize',
    BodyText15: 'A game merchandize shop allows players to purchase real-life game merchandise directly from within the game.',

    BodyTitle16: 'F2P | UIA | Rewarded Offer Wall',
    BodyText16: `Free to play games that feature UIA (User Incentivized Actions) mostly do so in the form of a rewarded offer wall. As the name suggests, offer walls feature many different “offers” that the player can choose to engage with. For instance filling in a survey, visit a website, or shop at a website, install another app or game or even engage with that app or game. After a particular action is completed an in-game benefutr is rewarded.

Other noticeable offers on offer wall include watching a video or interacting with a playable add.`,

    BodyTitle17: 'F2P | Mixed Model',
    BodyText17: 'A Free to play game that uses a mixed model approach utilizes several of the above monetization methods. Common are using various ads methods in combination with In-app purchases.',

    BodyTitle18: 'Premium | Game Purchase',
    BodyText18: `The classic game monetization method where the player purchases the game before she can play. Most prevalent on console and PC markets. In some cases a game is presented and delivered in several episodes which the player needs to purchase in a bundle, or individually.

Additionally, extra content, extending the game’s lifetime, are often offered as DLC (Downloadable Content), which requires an additional payment. These can include a continuation of the game’s story and plot, or additional items and game modes.`,

    BodyTitle19: 'Premium | Subscription',
    BodyText19: 'These games can only be played while a player is actively subscribed. Often, these games offer multiplayer and continuous updated.',

    BodyTitle20: 'Service Subscription | Benefit',
    BodyText20: `Games can also be offered as part of a service subscription, such as Apple Arcade, Xbox Game Pass and Netflix. The full game is available to the active subscriber of the service. And as with a premium purchase, episodes can also be unlocked through a subscription service.

Some games may not be part of the service subscription, such as some free to play games, but can offer benefits exclusively to the subscribers of a particular service.`,

    BodyTitle21: 'What monetization fits with your game?',
    BodyText21: 'So, with all these options in mind, what monetization strategy is the best? It really depends on many things. Let’s discuss some of the heavy weighing factors.',

    BodyTitle22: 'Audience',
    BodyText22: `Games are always made for a particular audience. It’s easy to assume that all games are made to pursue the largest possible audience, but many games are made specifically for a particular niche.

Certain audiences — mainly those who are really dedicated to their hobby — will appreciate premium games over free-to-play. They’ll enjoy the upfront consideration phase and gladly look for game reviews and expert opinions to fuel their enthusiasm to make a purchase. Once they decide to purchase the game, they’re free to immerse themselves in the experience.

Educational games could be promoted within school and other education facilities and therefore can be better monetized through subscriptions of premium price, the barrier to entry might be price based at all with these institutions. Some games exist to serve a very small and specific niche that will not look for games in the App- or Play Store.

However, if you want to reach many and more casual players directly and through the App- and Play Stores, opting for any of the F2P strategies is the most valid option — allowing players to play your game with the least amount of upfront friction. The audience on mobile is more impulse driven, making a choice based on curiosity and initial interest.`,

    BodyTitle23: 'Team capabilities',
    BodyText23: 'If you have your eyes on creating a F2P game, you need to understand the nature of F2P games and how they monetize. Any of the F2P monetization strategies take a long time to make money. A player that is playing for free needs to have great reasons (value) to pay for something or they need to watch countless ads before you see a decent return. This is the reason why F2P games are always concerned about player retention, and this is where your team capabilities come in. In order to offer your player days, weeks and months of content (rather than hours) you need to have a game that will offer that much content, so the game stays interesting for your player for that long, this content needs to be made by the team.If your team is limited, creating a F2P game might not be the best option.',

    BodyTitle24: 'Ambitions',
    BodyText24: `The ambitions you have for the game also play a crucial part in figuring out your monetization strategy. If your game is a finite experience that needs to have an end, like most narrative driven games that end their plot, creating a F2P game might not be the best solution. Some games are better because they end and reach a finale and creating a F2P game that requires this ending to be postponed might be hurting the experience.

Not all games are created to make (a lot of) money and may solely exist because the game developer wanted to create a particular experience, which makes accepting donations or a base price premium model a valid strategy.`,

    BodyTitle25: 'Great games',
    BodyText25: `Although I think I covered some of the fundamentals of monetization in games, there are certainly other factors at play and each team, each ambition and each game is unique and should be evaluated on its own to see what monetization strategy fits best.

No matter if you are an artistic indie developer or a publishing powerhouse, your monetization strategy should be part of the design process. When you’re an indie game developer, deciding upfront how you want to monetize your game will save you the time to think about it later, it will help you understand what’s important for your game. Don’t let it sit in the back of your mind while you are “figuring it out” as it will cause plenty of anxiety and waste your precious development time near the end of your project. If you know for sure F2P is the best option for your game, then it is absolutely imperative that you design your game with the monetization included. You need to design for value with every step that you take.

No matter what monetization strategy you choose, you still need a great game too!`,
  },
  {
    id: 'forcing-creativity',
    slug: 'forcing-creativity',
    HeaderTitle: 'Forcing Creativity',
    HeaderImage: 'src/files/articles/ForcingCreativity.png',
    HeaderSubTitle: 'Have you ever considered how creativity works? How do you come up with smart solutions and innovative ideas?',
    BodyText1: `Have you ever considered how creativity works? How do you come up with smart solutions and innovative ideas? Many consider creativity as something magical that just happens with little actual control. While others will find the need to enrich themselves with countless amounts of input and inspiration. And there are still others that think you need a blank canvas and just start. Almost all people feel like creativity needs some kind of freedom and that creativity cannot be forced, it just happens. 

But the answer lies in something that will feel very counterintuitive to many. Being creative and finding smart and innovative ideas has everything to do with accepting and acknowledging limitations in the creative process – and actually adding more limits rather than seeking freedom, creating more boundaries to your thoughts rather than seeking more inspiration.

More than a decade ago I gave a presentation to a select group of game industry people and students about this same topic. I used the notion of “Thinking outside the box” and I used this metaphor to better explain how creativity works.`,
    BodyImage2: 'src/files/articles/CreativityInside.png',
    BodyImage2Text: 'Handle with care',
    BodyText3: `I’m comparing this box to our minds. The box includes 2 distinct features namely the cardboard border and the content. The content of the box refers to all our ideas, thoughts and concepts that we may think of, while the border keeps this all together. It is really hard, if not nearly impossible, to think beyond these borders. Without borders, there would be no box and no limit to our thoughts. Without the box our thoughts would literally be infinite. So, where do these borders come from?

The cardboard borders of our mind are mainly defined by preconceptions, fuelled by experience and expectations. Our mind constantly associates things with other things; it’s constantly trying to find connections between different thoughts. This process is completely automatic and we have but limited control over this.

So let’s do a little thought experiment: Let’s say you are tasked to design a video game for home consoles with a target group of young males between the age of 8 and 12 years old and it had to be of the platforming genre. This will automatically set up borders in your mind with the four requirements I just mentioned. Let’s dissect what happens:

The words ‘video game’ splits the mind into 2 sections through every thought that is connected to video games and everything that is not. You might think about a screen, a desktop computer, an Atari 2600, etc. The same thing happens with the requirements ‘home console’, ‘8-12 year old male’ and possibly the strongest border in our requirements list is ‘platform game’. Genres -by their very definition- are a set of preconceptions, meant to describe a product of the same kind. So you are bound to think about jumping, collecting, character control, moving left to right and all other kinds of thoughts when you hear the words ‘platform game’.

Whenever we are thinking about anything our mind creates borders these borders, effectively boxing in your thought, hence the box metaphor. Now in everyday life this is extremely useful as it acts as a filter – a kind of search engine that helps us find and deal with related stuff very quickly. This box is in fact a comfort zone. But the problem is that these thoughts, ideas and concepts are superficial and incomplete and in most cases do not lead to the best design.

To combat this I use 2 techniques; making the Box smaller and creating a completely new Box.`,
    BodyTitle4: '1. Making the box smaller',
    BodyText4: `This process is started by our assignment already, it created our basic box. Doing some research will tighten the borders even further and some thoughts that are inside the Box may have to be dropped as research has proven them to be no longer valid. But the research has also made us more aware of the superficiality of the content, our thoughts, ideas and concept. We start to feel our borders and we are noticing that there isn’t really anything original inside our box. This feeling is uncomfortable and makes us doubt ourselves and if you are not careful could turn into the first step of designer block.

Our natural response is to expand the borders, to widen our view and to allow more thoughts in the box, allowing us to think about new ideas. So we add new ideas, and more new ideas and even more new ideas so we do not feel as restricted and we may even think that there are some creative new ideas in there. But it turns out that our box has become a big mess, a big pile of ideas with little correlation. In this messy pile it is hard to find anything.

So instead, we should not widen the box even if it seems so natural to do, but instead we should shrink the box, making it even smaller. And one of the ways to do this is to question the content, to question our preconceptions. To demonstrate this let’s go back to our thought experiment and take our platform game.

One of the many preconceptions I have about platform games, is that they always include a character that is controlled by the player. So what would happen if we question this and we do not control a character? One of the solutions to this challenge would be to control the world, not the character.  A classic example that does this brilliantly is LocoRoco, allowing us to control 1 big or many small creatures at once by turning the entire world, forcing the creatures into a direction while they roll to a side.`,
    BodyImage5: 'src/files/articles/locoroco.gif',
    BodyImage5Text: 'Sony’s Locoroco on Playstation Portable (2006)',
    BodyText6: `Another preconception of platform games is that the game is played with the standard controller, but what if we challenge this as well? What if we controlled the game with a pair of drums instead? We might end up with Donkey Kong: Jungle Beat…

This way of adding new borders by challenging the content of our box and thus by challenging our preconceptions creates a smaller and possibly differently shaped box and adds a lot of problems, because we can not find solutions within our preconceptions, within our comfort-zone. The secret is that these problems actually drive us, or better yet, force us to find solutions beyond the borders, beyond our comfort-zone. In this way, adding borders forces creativity.`,
    BodyTitle7: '2. Make a different Box',
    BodyText7: `The other solution would be to drop the Box that we set-up earlier and start with a completely new focus point. This new focus point can be anything. It could be game related, such as game mechanics, or it could be far removed from the comfort-zone, such as emotions for example.

Focusing on a completely new box frees the mind of its old borders and may provide a completely new perspective on the old box. Focusing on something that feels unrelated (such as our new box) helps you look at your old box with new eyes.

For example; a focus on time control could lead to a game as Braid, which in essence is still a platform game, but this idea would not occur in our old box, as it includes a new perspective. The old box was full of preconceptions about what a platform game would be, but it would not include stuff as time control. By focusing on time control first and by investigating what it means to be able to affect time sheds a new light on how it might affect the rest of our platform game.

But, I hear you thinking, isn’t this adding new ideas into our box,  expanding it, like we naturally tend to do, but shouldn’t? Yes it could have been part of our expanding Box, but we wouldn’t be able to assess the value and potential of that idea because it was simply one of many that we added. Because there was no focus – we simply added a bunch of ideas, it wouldn’t steer and guide us in the right direction. Instead of one of many, it becomes your guiding star providing us with a new perspective instead of a tagged on feature.

Focusing on something new, and investigating it in isolation and then returning to your old box and then seeing how you can make it fit will again, will force you to be creative. The further you are from your comfort-zone, the more the new perspective will provide you with new insight and innovative ideas.

These 2 ideas, shrinking the box or starting with a new box, really help creative processes. But it isn’t easy. It requires abandoning your comfort-zone, which takes courage, faith and determination.

You’ll need to abandon your comfort-zone with both techniques; shrinking the Box forces you to leave the Box while with the new Box it is a starting point. It takes courage and faith to believe in the fact that you can come up with solutions to problems that you have created by adding limits or by starting at a completely new starting point. It is all too easy to dismiss the borders you have created because the problems they create are seemingly too hard to find solutions for. It takes determination to hold on, and faith in your own creativity, believing in your power to overcome these problems and being able to innovate.`,
  },
  {
    id: 'vision-holders',
    slug: 'vision-holders',
    HeaderTitle: 'Vision Holders',
    HeaderImage: 'src/files/articles/VisionHolders.png',
    HeaderSubTitle: 'Learn why a vision holder is essential for a game to become a success.',
    BodyText1: `I’ve been part of a dozen teams throughout my career and one of the things that I have learned is that for any product and for any team to be successful, they need to be led by a vision holder. Teams will focus around- and deliver a vision, but to do so they need a person that upholds that vision for the project.

The vision holder does not have to be the lead of the project, and the vision holder doesn’t have to be in charge of the planning, lead the team or be the game’s designer. The vision holder doesn’t even have to be the one who came up with the vision – or the main idea behind the game – although in most cases that will occur more often. The vision holder is the one that understands the vision the clearest and above all beliefs in the vision and the success it will bring.

Creating a game is difficult and creating a game with a team is even more difficult. It is a lengthy and more often than not a very messy process.The more senior each member of the team is, the more demanding the job of the vision holder becomes. Experience more often than not feeds doubt. The wiser you are, the harder it is to be courageous. 

During each phase of development doubts arise and doubters appear who will challenge the project for its existence. Are we addressing the right audience? Did we choose the right theme? Is this gameplay fun enough? How will we ever monetize this? And when the game is in the midst of development, who will answer the questions? I hear some people thinking, “Data will give you these answers” but data can only be measured after the fact and these doubts and doubters will arise even before something can be measured.

The belief of the vision holder needs to be so strong that despite rational counter arguments from team members, despite upper management and stakeholders not being able to fully embrace the vision and despite data showing limited potential they can still make the case for this game.

Although the vision holder is often confused with the “person who has an idea”, they are very different. The person who has the idea is of way lesser value to the team and the project and they can be easily distinguished from the vision holder. The person who has an idea will defend the idea and will seek to make the idea in the exact manner as they envision the idea, however, the vision holder works differently.

The vision holder is very open, open to new ideas, open to feedback and improvements. Vision holders grab every opportunity to make the vision a reality, but also take every opportunity to make it better. They will inspect critique meticulously, dissect it and embark on discussion in order to understand the problems and make sure they address the raised issues.

No matter the data, no matter the talent or seniority of the team, no matter the formality of any process, proceeding with a game project as it goes through the different phases will in large parts come down to gut feeling. The belief in the vision.

It is during the doubts of senior management whether or not to continue investing in the project, that the need for a vision holder becomes apparent. It is during the rational rants of that senior team member that expresses doubt about the theme midway through development, that the need for a vision holder becomes apparent. It is during that soft launch period where the data seems to be showing that this is going nowhere, that the need for a vision holder becomes apparent. The vision holder will explain, present, defend and counter any logic and still pursue what they believe in. They will go through all adversity and move the game forwards towards the vision.

Great products are not easy and they are only recognized by the masses in hindsight. It is the vision holder that recognizes the greatness in foresight.`,
  },
  {
    id: 'unified-model-of-player-motivation',
    slug: 'unified-model-of-player-motivation',
    HeaderTitle: 'Unified Model of Player Motivation',
    HeaderImage: 'src/files/articles/UnifiedModelPlayerMotivation.png',
    HeaderSubTitle: 'A unified framework to understand players and their 10 reasons for playing games.',
    BodyText1: `Why do people play games? Over the years, countless models and theories have emerged attempting to explain the driving forces behind player engagement. From Roger Caillois’ early 1958 categorization of play to Richard Bartle’s seminal 1996 taxonomy of MUD players, and more recently modern industry research from Quantic Foundry, GameRefinery, and Self-Determination Theory (SDT) — the game industry has never lacked perspectives on player psychology.

Yet as game design evolved, developers frequently found that existing models had distinct overlaps, blind spots, or were too narrow in scope. Some models focused purely on competitive archetypes, while others overlooked casual or extrinsic drivers.

To bridge these gaps, I collected, analyzed, and unified the prevailing research into a single comprehensive framework: The Unified Model of Player Motivation. It provides a practical lens to understand why people play and how games can be thoughtfully designed to resonate with their audience.`,

    BodyImage2: "src/files/articles/Tj'ièn's Unified Player Motivation Model.png",
    BodyImage2Text: "Tj'ièn's Unified Model of Player Motivation",

    BodyText3: `The model is built on two core dimensions:
1. The 10 High-Level Motivators: Ten distinct psychological reasons why individuals engage with games.
2. The Scale of Dedication: A vertical axis representing player commitment and investment — from low dedication (casual, accessible interactions) to high dedication (hardcore, deep mastery, and extensive time/effort investment).

Let’s explore each of the 10 motivators in detail.`,

    BodyTitle4: '1. Social Connection',
    BodyText4: `Playing to engage, interact, and share experiences with others.

At lower dedication, players enjoy casual or asynchronous multiplayer, lighthearted co-op, or simply playing alongside family and friends. As dedication increases, players seek organized teams, guilds, active communication (voice chat, Discord coordination), and high-stakes competitive esports where status, teamwork, and social recognition are paramount.`,

    BodyTitle5: '2. Mastery & Expertise',
    BodyText5: `Playing to learn, hone skills, and experience tangible competence and personal growth.

Players driven by mastery seek progressive challenges that demand precision, reaction speed, deep mechanical understanding, or problem-solving. They thrive on clear feedback loops, intuitive controls, and overcoming obstacles that once seemed insurmountable.`,

    BodyTitle6: '3. Discovery',
    BodyText6: `Driven by a sense of wonder and the thrill of uncovering the unknown.

Discovery-motivated players love exploring expansive landscapes, unveiling hidden map areas, uncovering secrets, finding rare lore, or experimenting with novel game mechanics. They are intrinsically rewarded by the journey of exploration and surprise.`,

    BodyTitle7: '4. Escapism',
    BodyText7: `Playing to disconnect from real-world concerns and immerse oneself in an alternative reality.

Escapism allows players to leave daily stress behind. Whether stepping into the shoes of a heroic character in a narrative RPG, losing track of time in a sprawling fantasy universe, or enjoying a cozy simulation, players seek deep immersion and emotional detachment from everyday life.`,

    BodyTitle8: '5. Power & Control',
    BodyText8: `Playing to win, exert influence, and experience autonomy and agency over decisions and outcomes.

These players seek to feel powerful and impactful. Dominating opponents, commanding massive armies, optimizing builds to crush challenging bosses, or steering narrative branching through critical decisions directly feeds their desire for control and accomplishment.`,

    BodyTitle9: '6. Relaxation',
    BodyText9: `Playing to unwind, decompress, and restore inner emotional equilibrium.

Relaxation-driven players favor low-pressure environments, soothing aesthetics, repetitive and satisfying gameplay loops, or forgiving sandbox mechanics where fail states are minimal or absent. It serves as a gentle, restorative activity after a demanding day.`,

    BodyTitle10: '7. Thrill & Excitement',
    BodyText10: `Playing for visceral sensory stimulation, fast-paced action, and adrenaline rushes.

These players seek high-octane spectacle, intense speed, dramatic audiovisual feedback, and rapid reflexes. From heart-pounding racing games and intense shooters to explosive action titles, the visceral sensation of impact is their main driver.`,

    BodyTitle11: '8. Strategy & Management',
    BodyText11: `Playing to plan, optimize, and organize complex systems.

Low-dedication tactical players enjoy short-term puzzles, immediate resource juggling, or time-management games. High-dedication strategists thrive on multi-turn forecasting, economic optimization, deep base-building, and long-term contingency planning where patience and foresight yield massive rewards.`,

    BodyTitle12: '9. Expression',
    BodyText12: `Celebrating autonomy, creativity, and leaving an individual mark on the game world.

Expression spans cosmetic character customization, avatar fashion, designing elaborate homes or cities, and finding creative emergent solutions to game challenges. Players use the game as a canvas to express their unique identity and artistic flair.`,

    BodyTitle13: '10. Completion & Ownership',
    BodyText13: `Playing to accumulate items, check off lists, and achieve total completion.

Completionists are driven by progress bars, achievement trophies, card collections, item hoarding, and 100% completion stats. They find deep satisfaction in closure, collecting every rare item, and showcasing a fully completed catalogue.`,

    BodyTitle14: 'Scale of Dedication & Personal Profiles',
    BodyText14: `Player motivation is rarely one-dimensional. Every player possesses a unique "motivational fingerprint" consisting of multiple motivators at varying degrees of dedication. Furthermore, motivations are not static — they fluctuate depending on mood, available time, life stages, and context.

By plotting motivation across the dedication spectrum, we can visualize distinct player profiles. Below is an example of my own player motivation profile:`,

    BodyImage15: "src/files/articles/Tj'ièn's Own Player Motivation.png",
    BodyImage15Text: "Tj'ièn's Own Player Motivation Profile",

    BodyText16: `Mapping your own motivation profile (or your target audience's profile) provides invaluable design clarity. It reveals why certain game mechanics resonate deeply with you while others feel tedious, helping you design with deliberate empathy rather than personal projection.`,

    BodyTitle17: 'Applying the Model to Game Design',
    BodyText17: `Understanding player motivations is not just an academic exercise; it is an actionable design compass:
- Core Loop Alignment: Ensure your core loop directly feeds the primary motivations of your target audience.
- Harmonious Secondary Motivations: Integrate complementary secondary motivators (e.g., combining Mastery with Discovery, or Strategy with Expression) to enrich depth without cluttering focus.
- Audience Clarity: Avoid designing for "everyone" — games that clearly understand which player motivations they serve create stronger, more enduring connections with their players.`,
  },
];

/**
 * Parsed articles ready to render
 */
export const ARTICLES: ParsedArticle[] = RAW_ARTICLES.map((raw) => parseArticle(raw));

export function getArticleById(idOrSlug: string): ParsedArticle | undefined {
  const norm = idOrSlug.toLowerCase().trim();
  const slugified = norm.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const matched = ARTICLES.find(
    (a) =>
      a.id === idOrSlug ||
      a.slug === idOrSlug ||
      a.id.toLowerCase() === norm ||
      a.slug.toLowerCase() === norm ||
      a.headerTitle.toLowerCase() === norm ||
      a.headerTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === slugified ||
      a.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === slugified
  );

  if (matched) return matched;

  const rawMatched = RAW_ARTICLES.find(
    (a) =>
      a.id === idOrSlug ||
      a.slug === idOrSlug ||
      (a.id && a.id.toLowerCase() === norm) ||
      (a.slug && a.slug.toLowerCase() === norm) ||
      (a.HeaderTitle && a.HeaderTitle.toLowerCase() === norm) ||
      (a.HeaderTitle && a.HeaderTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === slugified)
  );

  return rawMatched ? parseArticle(rawMatched) : undefined;
}
