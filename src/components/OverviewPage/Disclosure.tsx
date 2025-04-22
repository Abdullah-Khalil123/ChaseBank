import React from "react";

const Disclosure = () => {
  return (
    <div className="px-screen-x mb-4">
      <p className="text-[12px] mb-[42px]">Disclosures</p>
      <p className="text-[12px] text-gray-800 mb-4">
        <span className="font-bold">JPMorgan Chase Bank, N.A.</span> and its
        affiliates (collectively “JPMCB”) offer investment products, which may
        include bank managed accounts and custody, as part of its trust and
        fiduciary services. Other investment products and services, such as
        brokerage and advisory accounts, are offered through{" "}
        <span className="font-bold">J.P. Morgan Securities LLC</span> (JPMS), a
        member of <span className="text-[#005eb8] underline">FINRA</span> and{" "}
        <span className="text-[#005eb8] underline">SIPC</span>. Insurance
        products are made available through Chase Insurance Agency, Inc. (CIA),
        a licensed insurance agency, doing business as Chase Insurance Agency
        Services, Inc. in Florida. JPMCB, JPMS and CIA are affiliated companies
        under the common control of JPMorgan Chase & Co. Products not available
        in all states.
      </p>

      <div className="text-sm border-1 border-gray-300 px-4 py-5 text-[#414042]">
        <p>INVESTMENT AND INSURANCE PRODUCTS ARE:</p>
        <ul className="list-disc list-inside">
          <li> NOT FDIC INSURED</li>
          <li>NOT INSURED BY ANY FEDERAL GOVERNMENT AGENCY</li>
          <li>
            NOT A DEPOSIT OR OTHER OBLIGATION OF, OR GUARANTEED BY, JPMORGAN
            CHASE BANK, N.A. OR ANY OF ITS AFFILIATES
          </li>
          <li>
            SUBJECT TO INVESTMENT RISKS, INCLUDING POSSIBLE LOSS OF THE
            PRINCIPAL AMOUNT INVESTED
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Disclosure;
