import * as Accordion from "@radix-ui/react-accordion";
import "./Radix.css";

export default function HomePage() {
  return (
    <div className="radix-container">
      <h2 className="welcome">Welcome to Hivemind</h2>
      <Accordion.Root type="single" defaultValue="item-1" collapsible>
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              About Hivemind
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            We are a new and upcoming social media app with big dreams to become
            the next big thing.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="AccordionItem" value="item-2">
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              How to get the most out of Hivemind
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            To get the most out of Hivemind, you&apos;ll have to make an account
            and also fill out our short form on the create page. Otherwise, you
            won&apos;t be able to leave comments and interact with people.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item className="AccordionItem" value="item-3">
          <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger className="AccordionTrigger">
              Features
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="AccordionContent">
            On Hivemind, you&apos;ll be able to leave posts for other people to
            see, leave a comment on other posts, and view other users profiles.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
