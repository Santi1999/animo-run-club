import type {Route} from './+types/terms-of-sale._index';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Terms of Sale | Ánimo Run Club'}];
};

export default function TermsOfSalePage() {
  return (
    <div className="px-8 sm:px-12 lg:px-16 py-12 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2 tracking-wide">TERMS OF SALE</h1>
      <p className="text-xs text-gray-500 mb-10">Last updated: January 1, 2025</p>

      {/* ── ONLINE STORE ─────────────────────────────────────────────────── */}
      <p className="text-xs font-semibold tracking-wide mb-6 text-gray-400 uppercase">
        Animorunclub.com — U.S. Legal Terms
      </p>

      <div className="text-sm text-gray-700 leading-relaxed mb-8">
        <p>
          These U.S. Legal Terms (&quot;Terms&quot;), as amended from time to
          time, govern your access and use of the U.S. online store webpages
          (&quot;Site&quot;) at animorunclub.com that directly link to these
          Terms, including, without limitation, any purchases you make via the
          Site. YOU ENTER INTO A BINDING CONTRACT UNDER NEW YORK LAW BASED ON
          THESE TERMS WITH ÁNIMO RUN CLUB (&quot;ÁNIMO&quot;, &quot;WE&quot; or
          &quot;US&quot;) IF YOU ACCESS OR USE THE SITE, OR PURCHASE ANY
          PRODUCTS ON THE SITE. If you do not want to agree to these Terms, you
          must leave the Site and cease any access, use or purchase activities.
        </p>
      </div>

      <Section title="Table of Contents">
        <ul className="list-disc list-inside space-y-1">
          <li>Governing Law and Choice of Forum</li>
          <li>Disclaimers and Limitations</li>
          <li>Access and Use</li>
          <li>Purchase of Products</li>
          <li>General Terms and Contact Information</li>
        </ul>
      </Section>

      <Section title="Governing Law and Choice of Forum">
        <p>
          These Terms, and any disputes arising out of or relating to these
          Terms, shall be governed by the laws of the State of New York, USA,
          without giving effect to its conflicts of law principles and excluding
          the U.N. Convention on the International Sale of Goods. All legal
          proceedings arising out of or in connection with these Terms shall be
          brought exclusively in the City of New York, State of New York.
        </p>
      </Section>

      <Section title="Disclaimers and Limitations">
        <p className="uppercase">
          Site use and any purchase is &quot;as is&quot; and at your own risk.
          WE MAKE NO EXPRESS REPRESENTATIONS OR WARRANTIES OF ANY KIND
          REGARDING THE ACCURACY OR COMPLETENESS OF INFORMATION ON THIS SITE OR
          THE CONDITION, FEATURES OR AVAILABILITY OF PRODUCTS DESCRIBED OR
          OFFERED FOR SALE ON THIS SITE. PRODUCT DESCRIPTIONS AND PHOTOS ARE
          FOR INFORMATIONAL PURPOSES ONLY AND MAY NOT COMPLETELY MATCH THE
          PRODUCTS, GIVEN THEIR UNIQUE CHARACTER AND FREQUENT CHANGES IN DESIGN.
          WE DISCLAIM ALL IMPLIED WARRANTIES AND REPRESENTATIONS, INCLUDING BUT
          NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
        </p>
        <SubSection title="Exclusive remedies">
          <p className="uppercase">
            YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISSATISFACTION, DEFECTS,
            ERRORS OR PROBLEMS REGARDING (A) THE SITE SHALL BE THAT YOU LEAVE
            THE SITE, AND (B) ANY PRODUCTS THAT YOU PURCHASE OR ATTEMPT TO
            PURCHASE VIA THE SITE SHALL BE AS EXPRESSLY SET FORTH IN OUR
            CANCELLATION, RETURN AND STORE CREDIT POLICIES.
          </p>
        </SubSection>
        <SubSection title="Our liability shall be limited">
          <p className="uppercase">
            ÁNIMO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR
            CONSEQUENTIAL DAMAGES, LOSS OF DATA, PROFITS, OR REVENUE, OR COST
            OF COVER, OR ANY SIMILAR OR OTHER DAMAGES ARISING FROM THE USE OF
            THE SITE OR THE PURCHASE OF ANY PRODUCT. THE AFOREMENTIONED
            LIMITATIONS OF LIABILITY SHALL APPLY TO ANY LOSS OR DAMAGES,
            HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, WHETHER
            DERIVED FROM CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, STRICT
            LIABILITY AND NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF ÁNIMO
            WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF
            WHETHER ANY OF THE LIMITED REMEDIES HEREUNDER FAIL OF THEIR
            ESSENTIAL PURPOSE.
          </p>
          <p className="uppercase mt-3">
            IF THE FOREGOING LIMITATIONS ARE HELD INAPPLICABLE OR UNENFORCEABLE
            FOR ANY REASON, THEN THE MAXIMUM LIABILITY OF ÁNIMO TO YOU FOR ANY
            TYPE OF DAMAGES RESULTING FROM YOUR PURCHASE OF A PRODUCT SHALL BE
            LIMITED TO THE GREATER OF THE ACTUAL AMOUNT PAID BY YOU FOR ANY
            PRODUCTS OFFERED ON THE SITE OR U.S. $200.00.
          </p>
        </SubSection>
        <SubSection title="Force Majeure">
          <p>
            Except for payment obligations, non-performance or late performance
            of either party shall be excused to the extent that performance is
            rendered impossible, commercially unreasonable, or delayed by
            strike, fire, flood, governmental acts or orders or restrictions,
            war, acts of terrorism, labor conditions, supply restrictions,
            communication or shipment problems, failure of suppliers, or any
            other reason where failure to perform is beyond the reasonable
            control of the non-performing or late performing party whether or
            not similar to the foregoing.
          </p>
        </SubSection>
      </Section>

      <Section title="Access and Use">
        <SubSection title="Property rights">
          <p>
            We own or license the server and software on which the Site is
            hosted, all photos, text, videos and other content displayed on the
            Site, and all trademarks, logos, product names and other marks, and
            we reserve our rights to exclude you from any access and use, except
            as expressly set forth herein.
          </p>
        </SubSection>
        <SubSection title="Limited license">
          <p>
            We grant you a limited, revocable (at any time, at our sole
            discretion), non-exclusive, non-transferable, non-sublicensable,
            royalty-free license to access the Site via general purpose Internet
            browser software for purposes of learning about products for private
            purpose purchases on the condition that you comply with these Terms,
            which constitute license limitations and conditions as well as
            contractual covenants. We do not authorize any other access, use or
            copying of the Site or any content of the Site, including, without
            limiting the generality of the foregoing, deeplinking, spidering,
            crawling, adaptation, or reproduction of the Site or any portions
            thereof.
          </p>
        </SubSection>
        <SubSection title="Submissions">
          <p>
            If you, at your sole discretion, submit any information or other
            materials to us, you grant us a nonexclusive, royalty-free,
            perpetual, irrevocable, unlimited (except as we expressly specify in
            our Privacy Statement or elsewhere on the Site) and fully
            transferable and sub-licensable right to copy, use, modify, sell and
            otherwise commercialize such materials throughout the world in any
            way now known or in the future discovered. You also represent and
            warrant that the materials are accurate and that you own the required
            rights to grant us the license specified in the preceding sentence.
            DO NOT SUBMIT ANY MATERIALS IF YOU CANNOT COMPLY WITH THESE TERMS.
          </p>
        </SubSection>
      </Section>

      <Section title="Purchase of Products">
        <SubSection title="Private use only">
          <p>
            By submitting your order, you represent that you are purchasing for
            private household use only. We do not authorize any sale of our
            products outside the U.S. or any commercial resale. You may purchase
            up to four items per individual article, except when otherwise
            indicated on the product page on the Site. We reserve the right to
            reject orders and further limit order quantities in our sole
            discretion at any time.
          </p>
        </SubSection>
        <SubSection title="Product information and availability">
          <p>
            Without limiting the generality of the disclaimers and limitations
            set forth in these Terms, given the unique nature of our products we
            cannot assume any liability or responsibility for any inaccuracies or
            errors, or for any loss or damage caused by or arising from your
            reliance on information obtained from or through this Site, and we
            may change information at any time. We determine product availability
            at the time we email you the shipping confirmation.
          </p>
        </SubSection>
        <SubSection title="Price, payment, taxes">
          <p>
            By submitting your order via the Site, you agree to pay the purchase
            price for the items you selected plus shipping and handling costs,
            and applicable sales tax, if any. Depending on the tax laws in your
            state, you may be required to pay use tax on purchases for which we
            do not collect sales tax. We only accept major credit cards and the
            other digital payment methods listed on the Site (which may be
            updated from time to time) as a form of payment. Store credits issued
            by Ánimo Run Club stores and/or authorized third party retailers are
            not redeemable for purchases through the Site.
          </p>
        </SubSection>
        <SubSection title="Delivery">
          <p>
            We will deliver the products you purchased to a common carrier at
            our warehouse for shipment to the destination in the continental
            United States that you select (we ship to Alaska, Puerto Rico, and
            Hawaii, but do not ship to Canada or other locations outside the
            United States; other details regarding shipping and delivery are
            described in the Shipping and Delivery section below). You receive
            title and you bear all risks of loss and damage to the products from
            the time we deliver the products to the carrier at our warehouse. For
            security reasons, all purchases from the Site require an adult
            signature upon delivery.
          </p>
        </SubSection>
        <SubSection title="Cancellations, returns">
          <p>
            We do not accept any cancellations or returns, except as specified
            in our Cancellation, Return and Store Credit Policies or required by
            applicable law.
          </p>
        </SubSection>
      </Section>

      <Section title="General Terms and Contact Information">
        <SubSection title="Changes">
          <p>
            We may change our prices, products, these Terms, our Cancellation,
            Return and Store Credit Policies and our Privacy Statement at any
            time, at our sole discretion, by publishing changes on the Site or
            otherwise notifying you. We will not apply changes to orders or data
            that you submitted prior to our publishing or otherwise notifying you
            of the changes, unless we obtain your consent, by providing a notice
            with opt-out opportunity on the Site, via email or otherwise.
          </p>
        </SubSection>
        <SubSection title="Severability">
          <p>
            If any provision of these Terms is determined to be invalid, illegal
            or unenforceable, such provision shall be upheld to the fullest
            extent legally permissible and the remaining provisions of these
            Terms shall remain in full force and effect. Nothing herein is
            intended to override mandatory laws to the extent they cannot be
            contractually altered or modified.
          </p>
        </SubSection>
        <SubSection title="Entire agreement">
          <p>
            These Terms and any additional terms that we may specify on the
            &quot;review your order&quot; page or on our order confirmation
            shall constitute the entire agreement between you and us with regard
            to the subject matter hereof, and supersede any prior agreements or
            understandings.
          </p>
        </SubSection>
        <SubSection title="Contact information">
          <p>
            This Site is operated by Ánimo Run Club. For questions, please
            contact us by email at{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              info@animorunclub.com
            </a>
            .
          </p>
        </SubSection>
      </Section>

      {/* ── CANCELLATION, RETURN AND STORE CREDIT POLICY ─────────────────── */}
      <div className="border-t border-gray-200 my-12" />
      <h2 className="text-lg font-bold mb-6 tracking-wide">
        CANCELLATION, RETURN AND STORE CREDIT POLICY
      </h2>

      <Section title="1. Cancellations, Returns, Refunds and Store Credits">
        <SubSection title="1.1 Cancellations">
          <p>
            You can cancel your order until the date of shipping for any reason
            free of charge and we will not charge your credit card. This includes
            pre-order items which may be cancelled up until shipment.
          </p>
        </SubSection>
        <SubSection title="1.2">
          <p>
            Cancellations cannot be made on or after the date of shipping and
            you will be charged the full amount for your order. Personalized
            products cannot be cancelled once ordered, as they may be in process
            of being customized.
          </p>
        </SubSection>
        <SubSection title="1.3 Returns">
          <p>
            Products purchased through the site may be returned free of charge,
            within thirty (30) days from the date of the shipping confirmation
            except for Personalized Products, which are non-returnable. The
            Products must be returned: (i) in their original condition with all
            tags still attached, including but not limited to, all identification
            tags, security tags and authenticity cards; (ii) in their original
            packaging; (iii) complete with all of their parts and accessories;
            (iv) with the original proof of purchase; and (v) from locations
            within the United States. Incomplete, damaged, worn or altered items
            will not be accepted. Further, in the event a product has a security
            tag and is returned without the security tag attached to the product,
            the product will not be accepted for return. We reserve the right to
            designate items that are not eligible for return or refund on the
            website. Such designation will be noted on the web page displaying
            the respective products. If the foregoing conditions are satisfied
            and you comply with the return instructions below, we will refund the
            purchase price of the returned product(s), sales tax included, less
            the original shipping costs, to the same credit card or PayPal
            account used to make the original purchase. Alternatively, and
            subject to the In-Store Returns instructions below, you may exchange
            your item for another item or return it for a store credit in any of
            our free-standing retail stores in the United States, within thirty
            (30) days of the shipping confirmation. PLEASE NOTE THAT IN STORE
            RETURNS OF MERCHANDISE PURCHASED THROUGH THE SITE ARE NOT ELIGIBLE
            FOR REFUND.
          </p>
        </SubSection>
        <SubSection title="1.4 Returns to Ánimo">
          <p>
            In addition to the above conditions, please follow the instructions
            below for processing your return(s) for a refund to your original
            payment method used to make your purchase.
          </p>
          <p className="mt-3 font-medium">
            To return your item for a full refund, please:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              Log in to your &quot;Account&quot; on animorunclub.com within
              thirty (30) days from the date of the shipping confirmation, access
              your order history and follow the online instructions. If you do
              not have an account, you may access your order by visiting the
              Returns section on our Contact page and inputting your order number
              and the email address associated with the original order.
            </li>
            <li>
              Affix the prepaid carrier shipping waybill included in the original
              package to the outside of the return package (by doing so, you will
              allow us to pay for your return shipping and trace your package).
            </li>
            <li>
              Drop the package off at a carrier shipping location, or arrange for
              pickup of the package directly with the carrier.
            </li>
          </ul>
          <p className="mt-3">
            Please note that if you utilize a carrier other than the one
            indicated in the return instructions included inside the package
            above, or if you fail to comply with the above, you will be
            responsible for all shipping and handling charges. Further, you shall
            solely and exclusively bear any and all risks associated with the
            return shipping and we shall in no event be liable for the loss,
            destruction, damage, misdirected or delayed shipment of any returned
            products.
          </p>
          <p className="mt-3">
            Please further note that we will not issue any refunds for returns
            that do not satisfy all of the conditions outlined above, and will
            ship your merchandise back to you at the original shipment address
            provided in your order. In the event that your merchandise cannot be
            delivered to you at your original shipping address, you authorize
            Ánimo Run Club, and any of its affiliates or agents, to dispose of
            such merchandise.
          </p>
          <p className="mt-3">
            Upon our receipt of your return package, we will verify the integrity
            of the items before accepting your return and processing the refund.
            Please note that this process may take between 5 and 10 days. We
            will send you a confirmation email as soon as we have begun
            processing the refund. The refund is issued directly to the card or
            PayPal account used for the original purchase. The refunded amount
            will be visible in your account within approximately one week (for
            PayPal orders) or within approximately one to two billing cycles from
            the date of the email we send you confirming that the refund is being
            processed (for credit card orders).
          </p>
        </SubSection>
        <SubSection title="1.5 In Store Returns">
          <ul className="list-none space-y-2">
            <li>
              (i) You may exchange your item for another item, or return it for
              store credit, at any of our free-standing retail stores in the
              United States, within thirty (30) days of the shipping
              confirmation.
            </li>
            <li>
              (ii) You must present the original proof of purchase at the time
              of the exchange.
            </li>
            <li>
              (iii) If you elect to exchange your item for an item that is lower
              in value, you will receive store credit for the difference. If you
              exchange your item for an item that is greater in value, you will
              be charged the difference. You will be responsible for all
              associated sales tax(es) on the exchanged item(s).
            </li>
            <li>(iv) A return for refund is not available in store.</li>
          </ul>
        </SubSection>
        <SubSection title="1.6 Store Credits">
          <p>
            Please note that store credits for purchases from stores in the
            United States expire one year following the date of issuance or the
            earliest date thereafter permitted by applicable law. Store credits
            are redeemable at Ánimo Run Club free-standing stores in the country
            in which they are issued (i.e., in the United States), subject to
            applicable law, and may only be redeemed for merchandise. STORE
            CREDITS RECEIVED FOR RETURNS OF MERCHANDISE ORIGINALLY PURCHASED
            THROUGH THE SITE ARE NOT REDEEMABLE FOR FUTURE PURCHASES THROUGH THE
            SITE.
          </p>
        </SubSection>
        <SubSection title="1.7">
          <p className="uppercase">
            WE RESERVE THE RIGHT TO DESIGNATE NON-RETURNABLE PRODUCTS ON THE
            SITE. ANY SUCH DESIGNATION WILL BE NOTED ON THE WEB PAGE DISPLAYING
            THE RESPECTIVE PRODUCTS WHICH ARE NONRETURNABLE. WE OFFER NO REFUNDS
            ON ANY PRODUCTS DESIGNATED ON THE SITE AS NON-RETURNABLE.
          </p>
        </SubSection>
      </Section>

      {/* ── SHIPPING AND DELIVERY ─────────────────────────────────────────── */}
      <div className="border-t border-gray-200 my-12" />
      <h2 className="text-lg font-bold mb-6 tracking-wide">
        SHIPPING AND DELIVERY
      </h2>

      <div className="text-sm text-gray-700 leading-relaxed space-y-5">
        <p>We offer the following delivery services:</p>

        <div className="border border-gray-200 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold">Service</th>
                <th className="text-right px-4 py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3">
                  Ground (generally delivers in 3–5 business days)
                </td>
                <td className="px-4 py-3 text-right">Complimentary</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3">
                  Second Day (generally delivers in 2 business days)*
                </td>
                <td className="px-4 py-3 text-right">$25.00</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3">
                  Overnight (generally delivers the next business day)*
                </td>
                <td className="px-4 py-3 text-right">$35.00</td>
              </tr>
              <tr>
                <td className="px-4 py-3">In-store Pick-up</td>
                <td className="px-4 py-3 text-right">Complimentary</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500">
          * Second Day and Overnight Delivery are not available for orders which
          include Fragrance products.
        </p>

        <p>
          We generally ship our online orders within 2 to 4 business days.
          However, the above mentioned delivery terms are not guaranteed.
          Products expressly marked on the Website as &quot;Pre Order&quot;,
          &quot;Pre Ordered Product&quot; or &quot;Personalized Products&quot;
          are not immediately available for shipment. The relevant dedicated link
          will show the estimated delivery date.
        </p>
        <p>
          Ánimo Run Club shall have the right to split the Order into multiple
          shipments. According to the availability of the Products for delivery,
          you may receive the Products separately upon their availability to be
          shipped. As soon as your order ships you will receive an email with the
          tracking number plus a link to follow the delivery status.
        </p>
        <p>
          We ship to the destination of your choice in the United States
          including Alaska, Hawaii, and Puerto Rico but do not ship to other
          locations outside the United States. Purchases cannot be shipped to
          P.O. boxes. For security reasons, all purchases from the Site require
          an adult signature upon delivery.
        </p>

        <div>
          <p className="font-semibold mb-2">Delivery of Fragrance Products</p>
          <p>
            Please note that Ground Delivery is the only available delivery
            method for fragrance products. If an order contains a Fragrance
            product all items in the order will be shipped Ground. If you would
            like to receive other items with a different delivery method please
            place separate orders.
          </p>
        </div>

        <p>
          If you have questions or would like more information, please contact us
          at{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>
          .
        </p>
      </div>

      {/* ── OMNICHANNEL SALES ─────────────────────────────────────────────── */}
      <div className="border-t border-gray-200 my-12" />
      <p className="text-xs font-semibold tracking-wide mb-2 text-gray-400 uppercase">
        Omnichannel Sales
      </p>
      <p className="text-xs font-semibold tracking-wide mb-6 text-gray-400 uppercase">
        Animorunclub.com — U.S. Legal Terms
      </p>

      <div className="text-sm text-gray-700 leading-relaxed mb-8">
        <p>
          These U.S. Legal Terms (&quot;Terms&quot;), as amended from time to
          time, govern purchases you make by placing orders with our boutiques
          that you pay for using the Pay By Link tab (defined below) instead of
          paying for the purchases at the point of sale at our boutiques (such
          distant purchases are referred to as &quot;Distant Sales&quot;). YOU
          ENTER INTO A BINDING CONTRACT UNDER NEW YORK LAW BASED ON THESE TERMS
          WITH ÁNIMO RUN CLUB (&quot;ÁNIMO&quot;, &quot;WE&quot; or
          &quot;US&quot;) IF YOU PURCHASE ANY PRODUCTS VIA DISTANT SALES. If you
          do not want to agree to these Terms, you must refrain from any purchase
          activities using Distant Sales.
        </p>
      </div>

      <Section title="Table of Contents">
        <ul className="list-disc list-inside space-y-1">
          <li>Governing Law and Choice of Forum</li>
          <li>Disclaimers and Limitations</li>
          <li>Access and Use of Pay By Link</li>
          <li>Purchase of Products</li>
          <li>General Terms and Contact Information</li>
        </ul>
      </Section>

      <Section title="Governing Law and Choice of Forum">
        <p>
          These Terms, and any disputes arising out of or relating to these
          Terms, shall be governed by the laws of the State of New York, USA,
          without giving effect to its conflicts of law principles and excluding
          the U.N. Convention on the International Sale of Goods. All legal
          proceedings arising out of or in connection with these Terms shall be
          brought exclusively in the City of New York, State of New York.
        </p>
      </Section>

      <Section title="Disclaimers and Limitations">
        <p className="uppercase">
          Purchase is &quot;as is&quot; and at your own risk. WE MAKE NO EXPRESS
          REPRESENTATIONS OR WARRANTIES OF ANY KIND REGARDING THE ACCURACY OR
          COMPLETENESS OF INFORMATION PROVIDED BY ÁNIMO AS PART OF THE DISTANT
          SALES PROCESS (INCLUDING WITHOUT LIMITATION ANY ORDER CONFIRMATIONS,
          CANCELLATIONS, OR OTHER COMMUNICATIONS (ELECTRONIC OR OTHERWISE), THE
          ACCESS OR CONTINUED ACCESS TO THE PAY BY LINK TAB, OR THE CONDITION,
          FEATURES OR AVAILABILITY OF PRODUCTS DESCRIBED OR OFFERED FOR SALE
          USING DISTANT SALES. PRODUCT DESCRIPTIONS AND PHOTOS ARE FOR
          INFORMATIONAL PURPOSES ONLY AND MAY NOT COMPLETELY MATCH THE PRODUCTS,
          GIVEN THEIR UNIQUE CHARACTER AND FREQUENT CHANGES IN DESIGN. WE
          DISCLAIM ALL IMPLIED WARRANTIES AND REPRESENTATIONS, INCLUDING BUT NOT
          LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE AND NON-INFRINGEMENT.
        </p>
        <SubSection title="Exclusive remedies">
          <p className="uppercase">
            YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISSATISFACTION, DEFECTS,
            ERRORS OR PROBLEMS REGARDING (A) DISTANT SALES SHALL BE THAT YOU DO
            NOT PURCHASE PRODUCT THROUGH A DISTANT SALE, AND (B) ANY PRODUCTS
            THAT YOU PURCHASE OR ATTEMPT TO PURCHASE VIA DISTANT SALES SHALL BE
            AS EXPRESSLY SET FORTH IN OUR CANCELLATION, RETURN AND STORE CREDIT
            POLICIES.
          </p>
        </SubSection>
        <SubSection title="Our liability shall be limited">
          <p className="uppercase">
            ÁNIMO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR
            CONSEQUENTIAL DAMAGES, LOSS OF DATA, PROFITS, OR REVENUE, OR COST OF
            COVER, OR ANY SIMILAR OR OTHER DAMAGES ARISING FROM THE USE OF THE
            PAY BY LINK TAB OR THE PURCHASE OF ANY PRODUCT VIA DISTANT SALES.
            THE AFOREMENTIONED LIMITATIONS OF LIABILITY SHALL APPLY TO ANY LOSS
            OR DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF
            LIABILITY, WHETHER DERIVED FROM CONTRACT, TORT (INCLUDING, BUT NOT
            LIMITED TO, STRICT LIABILITY AND NEGLIGENCE), OR ANY OTHER LEGAL
            THEORY, EVEN IF ÁNIMO WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES
            AND REGARDLESS OF WHETHER ANY OF THE LIMITED REMEDIES HEREUNDER FAIL
            OF THEIR ESSENTIAL PURPOSE.
          </p>
          <p className="uppercase mt-3">
            IF THE FOREGOING LIMITATIONS ARE HELD INAPPLICABLE OR UNENFORCEABLE
            FOR ANY REASON, THEN THE MAXIMUM LIABILITY OF ÁNIMO TO YOU FOR ANY
            TYPE OF DAMAGES RESULTING FROM YOUR PURCHASE OF A PRODUCT SHALL BE
            LIMITED TO THE GREATER OF THE ACTUAL AMOUNT PAID BY YOU FOR ANY
            PRODUCTS OFFERED VIA DISTANT SALES OR U.S. $200.00.
          </p>
        </SubSection>
        <SubSection title="Force Majeure">
          <p>
            Except for payment obligations, non-performance or late performance
            of either party shall be excused to the extent that performance is
            rendered impossible, commercially unreasonable, or delayed by
            strike, fire, flood, governmental acts or orders or restrictions,
            war, acts of terrorism, labor conditions, supply restrictions,
            communication or shipment problems, failure of suppliers, or any
            other reason where failure to perform is beyond the reasonable
            control of the non-performing or late performing party whether or
            not similar to the foregoing.
          </p>
        </SubSection>
      </Section>

      <Section title="Access and Use of Pay By Link">
        <p>
          If you, at your sole discretion, provide any information or other
          materials to us, you grant us a nonexclusive, royalty-free, perpetual,
          irrevocable, unlimited (except as we expressly specify in our Privacy
          Statement which will be available to you via a link in the electronic
          communications sent by us as part of the Distant Sale) and fully
          transferable and sub-licensable right to copy, use, modify, sell and
          otherwise commercialize such materials throughout the world in any way
          now known or in the future discovered. You also represent and warrant
          that the information and materials are accurate and that you own the
          required rights to grant us the license specified in the preceding
          sentence. DO NOT PROVIDE OR SUBMIT ANY MATERIALS IF YOU CANNOT COMPLY
          WITH THESE TERMS.
        </p>
      </Section>

      <Section title="Purchase of Products">
        <SubSection title="Private use only">
          <p>
            By submitting your order, you represent that you are purchasing for
            private household use only. We do not authorize any sale of our
            products outside the U.S. or any commercial resale. We reserve the
            right to reject orders and further limit order quantities in our sole
            discretion at any time.
          </p>
        </SubSection>
        <SubSection title="Product information and availability">
          <p>
            Without limiting the generality of the disclaimers and limitations
            set forth in these Terms, given the unique nature of our products, we
            cannot assume any liability or responsibility for any inaccuracies or
            errors, or for any loss or damage caused by or arising from your
            reliance on information obtained from or through the Distant Sale
            process, including any communications related thereto, and we may
            change information at any time. We determine product availability at
            the time we email you the shipping confirmation.
          </p>
        </SubSection>
        <SubSection title="Price, payment, taxes">
          <p>
            After submitting your order via telephone, digital or other similar
            means, or in our boutiques, we will send you an e-mail summarizing
            the details of the items you wish to order (an &quot;Order
            E-mail&quot;). The Order E-mail will contain a &quot;Pay By
            Link&quot; tab which will enable you to purchase the products listed
            in the Order E-mail. The Pay by Link tab will only be valid for a set
            period of time (as detailed in the Order E-mail), and if you do not
            complete your purchase during that time, you will need to start your
            order from the beginning. We will not be liable for any
            unavailability of the items or for any change in the products&apos;
            prices once the Pay By Link tab has expired.
          </p>
          <p className="mt-3">
            Once you click on the Pay By Link tab and enter in your payment
            details, you agree to pay the purchase price for the products you
            selected plus shipping and handling costs, and applicable sales tax,
            if any. Depending on the tax laws in your state, you may be required
            to pay use tax on purchases for which we do not collect sales tax. We
            only accept major credit cards and the other digital payment methods
            listed in the Pay By Link page (which may be updated from time to
            time) as a form of payment for purchases made through the Pay By Link
            tab. Store credits issued by Ánimo Run Club stores and/or authorized
            third party retailers are not redeemable for purchases through the
            Pay By Link tab.
          </p>
        </SubSection>
        <SubSection title="Delivery">
          <p>
            We will deliver the products you purchased to a common carrier at
            our warehouse for shipment to the destination in the United States
            that you select (we ship to Alaska, Puerto Rico, and Hawaii, but do
            not ship to Canada or other locations outside the continental United
            States; other details regarding shipping and delivery are described
            in the Shipping and Delivery section above). You receive title and
            you bear all risks of loss and damage to the products from the time
            we deliver the products to the carrier at our warehouse. For security
            reasons, all Distant Sales purchases may require, at the discretion
            of the carrier, an adult signature upon delivery.
          </p>
        </SubSection>
        <SubSection title="Cancellations, returns">
          <p>
            We do not accept any cancellations or returns, except as specified
            in our Cancellation, Return and Store Credit Policies or required by
            applicable law.
          </p>
        </SubSection>
      </Section>

      <Section title="General Terms and Contact Information">
        <SubSection title="Changes">
          <p>
            We may change our prices, products, these Terms, our Cancellation,
            Return and Store Credit Policies and our Privacy Statement at any
            time, at our sole discretion, by publishing changes on our website
            (animorunclub.com), communications with respect to the Distant Sale
            process (including Order E-mails) or otherwise notifying you. We
            will not apply changes to orders or data that you submitted prior to
            our publishing or otherwise notifying you of the changes, unless we
            obtain your consent, by providing a notice with opt-out opportunity,
            via email or otherwise.
          </p>
        </SubSection>
        <SubSection title="Severability">
          <p>
            If any provision of these Terms is determined to be invalid, illegal
            or unenforceable, such provision shall be upheld to the fullest
            extent legally permissible and the remaining provisions of these
            Terms shall remain in full force and effect. Nothing herein is
            intended to override mandatory laws to the extent they cannot be
            contractually altered or modified.
          </p>
        </SubSection>
        <SubSection title="Entire agreement">
          <p>
            These Terms and any additional terms that we may specify in any
            electronic communications (including the Order E-mail and email
            shipping confirmation you receive) shall constitute the entire
            agreement between you and us with regard to the subject matter
            hereof, and supersede any prior agreements or understandings.
          </p>
        </SubSection>
        <SubSection title="Contact information">
          <p>
            Distant Sales are conducted by Ánimo Run Club. For questions or
            more information, please contact us at{' '}
            <a href="mailto:info@animorunclub.com" className="underline">
              info@animorunclub.com
            </a>
            . Pay By Link is provided by a third party and such use by you may
            be subject to additional terms and conditions.
          </p>
        </SubSection>
      </Section>

      {/* ── OMNICHANNEL CANCELLATION POLICY ──────────────────────────────── */}
      <Section title="Cancellation, Return and Store Credit Policy (Omnichannel)">
        <SubSection title="1. Cancellations, Returns, Refunds and Store Credits" />
        <SubSection title="1.1 Cancellations">
          <p>
            You can cancel your order until the date of shipping for any reason
            free of charge. This includes pre-order items which may be cancelled
            up until shipment. Orders properly cancelled pursuant to this Section
            will have the amounts listed therein reimbursed to the original form
            of payment (if your payment method was charged).
          </p>
        </SubSection>
        <SubSection title="1.2">
          <p>
            Cancellations cannot be made on or after the date of shipping and
            you will be charged the full amount for your order. Products
            expressly marked as &quot;personalized products&quot; cannot be
            cancelled once ordered, as they may be in process of being
            customized.
          </p>
        </SubSection>
        <SubSection title="1.3 Returns">
          <p>
            Products purchased through Pay By Link may be returned free of
            charge, within thirty (30) days from the date of the shipping
            confirmation except for products expressly marked as personalized
            products, which are non-returnable. The products must be returned:
            (i) in their original condition with all tags still attached,
            including but not limited to, all identification tags, security tags
            and authenticity cards; (ii) in their original packaging; (iii)
            complete with all of their parts and accessories; (iv) with the
            original proof of purchase; and (v) from locations within the United
            States. Incomplete, damaged, worn or altered items will not be
            accepted. We reserve the right to designate items that are not
            eligible for return or refund in any electronic communications
            (including the Order E-mail) we send you.
          </p>
          <p className="mt-3">
            If the foregoing conditions are satisfied and you comply with the
            return instructions below, we will refund the purchase price of the
            returned product(s), sales tax included, less the original shipping
            costs, to the same credit card or other digital payment methods used
            to make the original purchase. Alternatively, and subject to the
            In-Store Returns instructions below, you may exchange your item for
            another item or return it for a store credit or refund (to the same
            credit card or PayPal account used to make the original purchase) in
            any of our free-standing retail stores in the United States, within
            thirty (30) days of the shipping confirmation.
          </p>
        </SubSection>
        <SubSection title="1.4 Returns to Ánimo">
          <p>
            In addition to the above conditions, please follow the return
            instructions provided to you when you receive your products for
            processing your return(s) for a refund to your original payment
            method used to make your purchase. Please note to:
          </p>
          <ul className="list-none space-y-2 mt-3">
            <li>
              (i) Affix the prepaid carrier shipping waybill included in the
              original package to the outside of the return package (by doing so,
              you will allow us to pay for your return shipping and trace your
              package).
            </li>
            <li>
              (ii) Drop the package off at a carrier shipping location, or
              arrange for pickup of the package directly with the carrier.
            </li>
          </ul>
          <p className="mt-3">
            Please note that if you utilize a carrier other than the one
            indicated in the return instructions, you will be responsible for all
            shipping and handling charges. You shall solely and exclusively bear
            any and all risks associated with the return shipping.
          </p>
          <p className="mt-3">
            Upon our receipt of your return package, we will verify the integrity
            of the items before accepting your return and processing the refund.
            This process may take between 5 and 10 days. We will send you a
            confirmation email as soon as we have begun processing the refund.
            The refunded amount will be visible in your account within
            approximately one to two billing cycles from the date of the
            confirmation email.
          </p>
        </SubSection>
        <SubSection title="1.5 In Store Returns">
          <ul className="list-none space-y-2">
            <li>
              (i) You may exchange your item for another item, or return it for
              store credit (only in certain instances) or refund (to the same
              credit card or PayPal account used to make the original purchase),
              at any of our free-standing retail stores in the United States,
              within thirty (30) days of the shipping confirmation. Store credit
              is only issued if you are exchanging your item for another item of
              lesser value.
            </li>
            <li>
              (ii) You must present the original proof of purchase at the time
              of the exchange.
            </li>
            <li>
              (iii) If you elect to exchange your item for an item that is lower
              in value, you will receive store credit or refund for the
              difference. If you exchange your item for an item that is greater
              in value, you will be charged the difference. You will be
              responsible for all associated sales tax(es) on the exchanged
              item(s).
            </li>
          </ul>
        </SubSection>
        <SubSection title="1.6 Store Credits">
          <p>
            Please note that store credits for purchases from stores in the
            United States expire one year following the date of issuance or the
            earliest date thereafter permitted by applicable law. Store credits
            are redeemable at Ánimo Run Club free-standing stores in the country
            in which they are issued (i.e., in the United States), subject to
            applicable law, and may only be redeemed for merchandise. STORE
            CREDITS RECEIVED FOR RETURNS OF MERCHANDISE ORIGINALLY PURCHASED
            THROUGH PAY BY LINK ARE ONLY REDEEMABLE FOR FUTURE PURCHASES IN
            ÁNIMO RUN CLUB FREE-STANDING STORES AND ARE NOT REDEEMABLE THROUGH
            ANIMORUNCLUB.COM, NOR CAN THEY BE USED FOR DISTANT SALES.
          </p>
        </SubSection>
        <SubSection title="1.7">
          <p className="uppercase">
            WE RESERVE THE RIGHT TO DESIGNATE NON-RETURNABLE PRODUCTS IN ANY
            ELECTRONIC COMMUNICATIONS (INCLUDING THE ORDER E-MAIL) WE SEND YOU.
            ANY SUCH DESIGNATION WILL BE NOTED IN ELECTRONIC COMMUNICATIONS
            (INCLUDING THE ORDER E-MAIL) WE SEND YOU, DISPLAYING THE RESPECTIVE
            PRODUCTS WHICH ARE NONRETURNABLE. WE OFFER NO REFUNDS ON ANY
            PRODUCTS DESIGNATED AS NON-RETURNABLE IN ELECTRONIC COMMUNICATIONS
            (INCLUDING THE ORDER E-MAIL).
          </p>
        </SubSection>
      </Section>

      <Section title="Shipping and Delivery (Omnichannel)">
        <p>We offer the following delivery services for Distant Sales:</p>
        <div className="border border-gray-200 overflow-hidden mt-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold">Service</th>
                <th className="text-right px-4 py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3">
                  Ground (generally delivers in 3–5 business days)
                </td>
                <td className="px-4 py-3 text-right">Complimentary</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  Second Day (generally delivers in 2 business days)*
                </td>
                <td className="px-4 py-3 text-right">$25.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Second Day Delivery is not available for orders which include
          Fragrance products.
        </p>
        <p className="mt-4">
          We generally ship our Distant Sales orders within 2 to 4 business
          days. However, the above mentioned delivery terms are not guaranteed.
          Ánimo Run Club shall have the right to split an order into multiple
          shipments. As soon as your order ships you will receive an email with
          the tracking number plus a link to follow the delivery status.
        </p>
        <p className="mt-3">
          We ship to the destination of your choice in the United States
          including Alaska, Hawaii and Puerto Rico but do not ship to other
          locations outside the United States. Purchases cannot be shipped to
          P.O. boxes.
        </p>
        <p className="mt-4 font-semibold">Delivery of Fragrance Products</p>
        <p className="mt-1">
          Please note that Ground Delivery is the only available delivery method
          for fragrance products. If an order contains a Fragrance product all
          items in the order will be shipped Ground. If you would like to receive
          other items with a different delivery method, please place separate
          orders.
        </p>
        <p className="mt-4">
          If you have questions or would like more information, please contact us
          at{' '}
          <a href="mailto:info@animorunclub.com" className="underline">
            info@animorunclub.com
          </a>
          .
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold tracking-wide mb-4 uppercase">
        {title}
      </h2>
      <div className="text-sm text-gray-700 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="font-medium mb-2">{title}</p>
      {children}
    </div>
  );
}
