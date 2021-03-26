import { useRouter } from 'next/router'
import Head from 'next/head'
import React, { Component } from 'react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Link from 'next/link'

export default function Comments({ res }) {
	var arr = Object.entries(res)
	return (
	  <div>
		Here's the result :
		<ol>
			{arr.map((value, index) => (
            	<li key={index}>{value[1].title}</li>
        	))}
		</ol>
	  </div>
	);
  }
  
  export async function getServerSideProps({ params }) {
	const { id, article } = params;
	console.log(id)

	const req = await fetch(
	  `http://localhost:4000/reddit/${id}/comments/${article}`
	);
	const res = await req.json();
  
	return {
	  props: { res } // will be passed to the page component as props
	};
  }