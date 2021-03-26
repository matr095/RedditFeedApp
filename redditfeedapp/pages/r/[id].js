import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { Component } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'

export default function Search({ res }) {
	var arr = Object.entries(res)
	console.log(arr)
	return (
	  <div>
		Here's the result :
		<ol>
			{arr.map((value, index) => (
            	<li key={index}><a href={value[1].id}>{value[1].title}</a></li>
        	))}
		</ol>
	  </div>
	);
  }
  
  export async function getServerSideProps({ params }) {
	const { id } = params;
  
	const req = await fetch(
	  `http://localhost:4000/reddit/${id}`
	);
	const res = await req.json();
  
	return {
	  props: { res } // will be passed to the page component as props
	};
  }