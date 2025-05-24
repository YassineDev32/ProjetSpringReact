// utils/generateContract.js
import { pdf } from "@react-pdf/renderer";
import RentalAgreementPDF from "./RentalAgreementPDF";

export const generateContract = async (reservation, user, payment) => {
  try {
    const pdfBlob = await pdf(
      <RentalAgreementPDF
        reservation={reservation}
        user={user}
        currentDate={new Date().toLocaleDateString()}
        payment={payment}
      />
    ).toBlob();
    const fileName = `Contrat_${user.firstname}_${user.lastname}.pdf`;
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating contract:", error);
  }
};
