import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Photo from "../../assets/images/logo.png";
import Signature from "../../assets/images/signature.png";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottom: "2px solid #2563eb",
    paddingBottom: 15,
  },
  logo: {
    width: 100,
    height: 50,
  },
  documentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "right",
  },
  referenceNumber: {
    fontSize: 9,
    color: "#64748b",
    textAlign: "right",
    marginTop: 4,
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
    paddingBottom: 2,
    borderBottom: "1px solid #e2e8f0",
  },
  contentBlock: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 8,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
    color: "#334155",
  },
  value: {
    width: "65%",
    color: "#1e293b",
  },
  highlight: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  signatureSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  signatureLine: {
    borderBottom: "1px solid #94a3b8",
    marginVertical: 15,
  },
  signatureLabel: {
    fontSize: 9,
    color: "#64748b",
    textAlign: "center",
    marginTop: 4,
  },
  signatureImage: {
    width: 60,
    height: 30,
    alignSelf: "center",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#64748b",
    fontSize: 8,
    borderTop: "1px solid #e2e8f0",
    paddingTop: 15,
  },
  termsSection: {
    padding: 40,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 30,
  },
  termsContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#334155",
  },
  termItem: {
    marginBottom: 15,
  },
  status: {
    padding: "3px 6px",
    borderRadius: 4,
    fontSize: 9,
    fontWeight: "bold",
  },
  statusPaid: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
});

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR');

const StatusBadge = ({ status }) => (
  <Text
    style={[
      styles.status,
      status === "PAID" && styles.statusPaid,
    ]}
  >
    {status === "PAID" ? "PAYÉ" : status}
  </Text>
);

const RentalAgreementPDF = ({ reservation, currentDate, payment }) => {
  if (!reservation || !payment || !currentDate) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Informations manquantes pour générer le document.</Text>
        </Page>
      </Document>
    );
  }

  const reference = Math.random().toString(36).substr(2, 9).toUpperCase();
  const representativeName = "Yassine Said";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={Photo} />
          <View>
            <Text style={styles.documentTitle}>Contrat de Location</Text>
            <Text style={styles.referenceNumber}>RÉF: {reference}</Text>
          </View>
        </View>

        {/* Vehicle Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Véhicule</Text>
          <View style={styles.highlight}>
            <View style={styles.row}>
              <Text style={styles.label}>Véhicule:</Text>
              <Text style={styles.value}>
                {reservation.car.model.mark.name} {reservation.car.model.name}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Type de Carburant:</Text>
              <Text style={styles.value}>{reservation.car.fuelType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tarif Journalier:</Text>
              <Text style={styles.value}>{reservation.car.price} DHS</Text>
            </View>
          </View>
        </View>

        {/* Rental Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Période de Location</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Date de Début:</Text>
            <Text style={styles.value}>{formatDate(reservation.startDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date de Fin:</Text>
            <Text style={styles.value}>{formatDate(reservation.endDate)}</Text>
          </View>
        </View>

        {/* Renter Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du Locataire</Text>
          <View style={styles.contentBlock}>
            <View style={styles.row}>
              <Text style={styles.label}>Nom Complet:</Text>
              <Text style={styles.value}>
                {reservation.user.firstname} {reservation.user.lastname}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Adresse:</Text>
              <Text style={styles.value}>{reservation.address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Téléphone:</Text>
              <Text style={styles.value}>{reservation.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{reservation.user.email}</Text>
            </View>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du Paiement</Text>
          <View style={styles.highlight}>
            <View style={styles.row}>
              <Text style={styles.label}>Montant:</Text>
              <Text style={styles.value}>{payment.amount} DHS</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date de Paiement:</Text>
              <Text style={styles.value}>{formatDate(payment.paymentDate)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Méthode:</Text>
              <Text style={styles.value}>
                {payment.method === "CREDIT_CARD" ? "Carte Bancaire" : payment.method}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Statut:</Text>
              <StatusBadge status={payment.invoice.status} />
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              {reservation.user.firstname} {reservation.user.lastname}
            </Text>
            <Text style={styles.signatureLabel}>Signature du Locataire</Text>
            <Text style={styles.signatureLabel}>Date: {formatDate(currentDate)}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>{representativeName}</Text>
            <Text style={styles.signatureLabel}>Représentant de la Société</Text>
            <Text style={styles.signatureLabel}>Date: {formatDate(currentDate)}</Text>
            <Image style={styles.signatureImage} src={Signature} />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>CaroteX • 12 Boulevard Mohammed V, Casablanca 20250, Maroc</Text>
          <Text>Tél: +212 522-123-456 • Email: contact@CaroteX.ma</Text>
        </View>
      </Page>

      {/* Terms and Conditions Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Conditions Générales</Text>
          <View style={styles.termsContent}>
            {[
              "Le locataire s'engage à restituer le véhicule dans l'état où il a été loué, à la date et à l'heure convenues.",
              "Le locataire est responsable de tous les dommages causés au véhicule pendant la période de location.",
              "L'utilisation du véhicule est strictement interdite en dehors des limites géographiques spécifiées dans le contrat.",
              "Le paiement de la location doit être effectué intégralement avant la remise des clés.",
              "La société se réserve le droit d'annuler le contrat en cas de non-respect des termes mentionnés.",
              "Le locataire doit présenter un permis de conduire valide et une pièce d'identité lors de la prise du véhicule.",
              "Toute prolongation de la durée de location doit être demandée et approuvée au moins 24 heures à l'avance.",
              "Le véhicule doit être restitué avec le même niveau de carburant qu'à la prise en charge.",
              "En cas d'accident, le locataire doit immédiatement informer la société et les autorités compétentes.",
              "La sous-location du véhicule est strictement interdite."
            ].map((term, index) => (
              <View key={index} style={styles.termItem}>
                <Text>{`${index + 1}. ${term}`}</Text>
              </View>
            ))}
          </View>
        </View>
       {/* Footer */}
       <View style={styles.footer}>
          <Text>CaroteX • 12 Boulevard Mohammed V, Casablanca 20250, Maroc</Text>
          <Text>Tél: +212 522-123-456 • Email: contact@CaroteX.ma</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RentalAgreementPDF;