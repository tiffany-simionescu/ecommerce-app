import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { 
  Table, 
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';
import { numberFormat } from '../../functions/product';

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleDateString()} ~
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.name}>{order.orderedBy.address[0].name}</Text>
      <Text style={styles.address}>
        {order.orderedBy.address[0].street},{" "} 
          {order.orderedBy.address[0].apt !== "" ? 
            `Apt: ${order.orderedBy.address[0].apt}, ${order.orderedBy.address[0].city}` : 
            order.orderedBy.address[0].city},{" "}
            {order.orderedBy.address[0].state}{" "}
            {order.orderedBy.address[0].postalCode}
      </Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <Table>
        <TableHeader>
          <TableCell style={styles.cellPaddingHeader}>Title</TableCell>
          <TableCell style={styles.cellPaddingHeader}>Price</TableCell>
          <TableCell style={styles.cellPaddingHeader}>Quantity</TableCell>
          <TableCell style={styles.cellPaddingHeader}>Brand</TableCell>
          <TableCell style={styles.cellPaddingHeader}>Color</TableCell>
        </TableHeader>
      </Table>

      <Table data={order.products}>
        <TableBody>
          <DataTableCell style={styles.cellPadding} getContent={(p) => p.product.title} />
          <DataTableCell style={styles.cellPadding} getContent={(p) => `$${numberFormat(p.product.price)}`} />
          <DataTableCell style={styles.cellPadding} getContent={(p) => p.count} />
          <DataTableCell style={styles.cellPadding} getContent={(p) => p.product.brand} />
          <DataTableCell style={styles.cellPadding} getContent={(p) => p.color} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        {'\n'}
        <Text style={styles.cellPadding}>
          Date: {'               '} 
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {'\n'}
        {'\n'}
        <Text style={styles.cellPadding}>
          Order Id: {'         '} 
          {order.paymentIntent.id}
        </Text>
        {'\n'}
        {'\n'}
        <Text style={styles.cellPadding}>
          Order Status: {'  '} 
          {order.orderStatus}
        </Text>
        {'\n'}
        {'\n'}
        <Text style={styles.cellPadding}>
          Total Paid: {'       '} 
          {`$${numberFormat(order.paymentIntent.amount)}`}
        </Text>
      </Text>

      <Text style={styles.footer}>
        ~ Thank you for shopping with us ~
      </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  cellPadding: {
    padding: 5
  },
  cellPaddingHeader: {
    padding: 5,
    backgroundColor: "lightgrey"
  }
});

export default Invoice;